import { forwardRef, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { fetchLatest } from 'src/botaxie/fetch/fetch_latest';
import { filterForInstances, MatchData } from 'src/botaxie/filter/filterAxies';
import Axie from 'src/types/Axie';
import AxieConfig from 'src/types/AxieConfig';
import { Repository } from 'typeorm';
import { Instance } from './entities/instance.entity';
import { InstancesService } from './instances.service';
const Web3 = require("web3")
const w3 = new Web3('https://api.roninchain.com/rpc');
import {buyAxie, PurchaseAttemptResult} from "../botaxie/eth/buy_axie"
import { EventLogsService } from 'src/event-logs/event-logs.service';
// const {buyAxie} = require("../botaxie/eth/buy_axie")
import * as dotenv from 'dotenv';
import { InstanceLogsService } from 'src/instance-logs/instance-logs.service';
dotenv.config();

if (!process.env.MIN_RON_BALANCE)
  throw "MIN RON BALANCE REQUIRED"

@Injectable()
export class CronService {
  constructor(
    @InjectRepository(Instance)
    private instanceRepo: Repository<Instance>,

    @Inject(forwardRef(() => InstancesService))
    private instancesService: InstancesService,

    @Inject("EVENT_LOGS_SERVICE")
    private eventLogsService: EventLogsService,

    @Inject("INSTANCE_LOGS_SERVICE")
    private instanceLogsService: InstanceLogsService,

  ) {
    if (process.env.MIN_RON_BALANCE)
      this.minRonBalance = parseFloat(process.env.MIN_RON_BALANCE)
    this.instanceRepo
      .createQueryBuilder("instance")
      .select()
      .addSelect("instance.pk")
      .where({ status: 0 })
      .getMany()
      .then((instances) => {
        instances.map((instance) =>
          this.addInstance(
            { ...instance, pk: undefined } as any,
            JSON.parse(instance.configJson),
            instance.pk,
          ));
      })
    this.logger.debug("initialized Instances from db");

  }
  private minRonBalance: number;

  async getRonBalance(address: string) {
    const balance = await w3.eth.getBalance(address);
    return parseFloat(w3.utils.fromWei(balance));
  }

  async getWethBalance(address: string) {
    const weth = new w3.eth.Contract(
      [
        {
          constant: true,
          inputs: [{ name: '_owner', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ name: 'balance', type: 'uint256' }],
          type: 'function',
        },
      ] as any,
      '0xc99a6a985ed2cac1ef41640596c5a5f9f4e19ef5',
    );
    const balance = await weth.methods.balanceOf(address).call();
    return parseFloat(w3.utils.fromWei(balance));
  }

  private readonly logger = new Logger(CronService.name);

  //user data
  private instanceIdToPk: Map<string, string> = new Map<string, string>();
  private instanceIdToConfig: Map<string, AxieConfig> = new Map<
    string,
    AxieConfig
  >();
  private instances: Map<string, Instance> = new Map<string, Instance>();

  //axies
  private latestAxies: Axie[] = []
  private matchedAxies: number[] = []
  private busyInstances: Set<string> = new Set<string>();
  private maxAxieQueueCount = 10

  async removeUnhealthyInstance(){
    for (const [id,instance] of this.instances){
      try{
        await this.checkInstanceHealth(instance);
      }
      catch(e){
        console.log(e.response)
        await this.removeInstance(id, e.response);
      }
    }
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron() {

    //await this.removeUnhealthyInstance();

    if (this.instances.size == 0) {
      this.logger.debug('No instances, exiting');
      return;
    }

    this.logger.debug('Fetching and filtering for ' + this.instances.size + " instances");

    const axies: Axie[] = await fetchLatest(10);
    console.log("fetched", axies.length, "axies");
    this.latestAxies = [
      ...axies.filter((a) => {
        return !this.latestAxies.find(l => {
          return l.id === a.id
        })
      }),
      ...this.latestAxies
    ];
    this.latestAxies = this.latestAxies.filter((a: Axie) => !this.matchedAxies.includes(parseInt(a.id)))
    if (this.latestAxies.length > this.maxAxieQueueCount) {
      this.latestAxies = this.latestAxies.splice(0, this.maxAxieQueueCount)
    }
    console.log("latest axies", this.latestAxies.map(a => a.id));

    console.log("busy instances", this.busyInstances)
    const matchesData = filterForInstances(this.latestAxies, this.instances, this.instanceIdToConfig, this.busyInstances);
    this.matchedAxies = [...matchesData.matchedAxies, ...this.matchedAxies]
    // attempt to buy
    this.handleMatches(matchesData);
  }


  async handleMatches(matchesData: MatchData) {
    console.log("handling matches");
    console.log(matchesData);

    for (const instanceId in matchesData.matches) {
      const instance = this.instances.get(instanceId)
      if (!instance) continue;
      const axieId = (matchesData.matches as any)[instanceId];

      this.instanceLogsService.newInstanceLog(instance.userId,instanceId, "Matched with axie #"+axieId);

      this.busyInstances.add(instanceId);
      buyAxie(this.instanceIdToPk.get(instanceId) as string, axieId)
        .then((result : PurchaseAttemptResult) => {
          console.log("buy attempt status", result.status ? "success" : "failure", result.data.message);
          if (result.status == false)
          {
            // log successful attempt                   
            this.eventLogsService.createPurchaseAttemptLog(true, axieId, instance);
            // instance log
            this.instanceLogsService.newInstanceLog(instance.userId,instanceId, "Succesfully purchased axie #"+axieId);

            // update progress in db and local instance
            (this.instances.get(instanceId) as any).progress++;
            this.instanceRepo.save((this.instances.get(instanceId) as any));
            // terminate if target  reached 
            const inst = this.instances.get(instanceId)
            if (inst && inst.progress == inst.target )
            {
              //log instance log
              this.instanceLogsService.newInstanceLog(instance.userId,instanceId, "Succesfully reached target of "+instance.target+" axies");
              // log termination event
              this.removeInstance(inst.instanceId, "Succesfully reached target")
            }
          }
          else if(result.status == true)
          {
            // log failed purchase attempt
            this.eventLogsService.createPurchaseAttemptLog(false,axieId, instance)
            // instance log
            this.instanceLogsService.newInstanceLog(instance.userId,instanceId, "Failed to purchase axie #"+axieId);

          }
          else{
            throw "Shouldn't be here, buy attempt return"
          }
          this.busyInstances.delete(instanceId);
        })
        .catch((e : any) => {
          console.log(e.message);
          this.busyInstances.delete(instanceId);
        })
    }
  }
  instanceRequirements(config: AxieConfig, target: number) {
    const maxPrice = config.maxPrice;
    const timesTarget = maxPrice * target;
    const fee = timesTarget * 0.04;
    const total = fee + timesTarget;
    return {
      maxPrice,
      timesTarget,
      fee,
      total,
    };
  }
  
  async checkInstanceHealth(instance: Instance){
    const reqs = this.instanceRequirements(
      JSON.parse(instance.configJson),
      instance.target - instance.progress,
    );
    const wethBalance = await this.getWethBalance(instance.wallet);
    if (wethBalance < reqs.total) {
      throw new UnauthorizedException({
        message: 'Unsufficient WETH balance',
        ...reqs,
        balance: wethBalance,
      });
    }
    const ronBalance = await this.getRonBalance(instance.wallet);
    if (wethBalance < reqs.total) {
      throw new UnauthorizedException({
        message: 'Unsufficient RON balance',
        ronBalance: ronBalance,
        required: instance.target * this.minRonBalance
      });
    }
    return true;
  }

  addInstance(instance: Instance, config: AxieConfig, pk: string) {
    this.instances.set(instance.instanceId, instance);
    this.instanceIdToConfig.set(instance.instanceId, config);
    this.instanceIdToPk.set(instance.instanceId, pk);

    // logging
    this.eventLogsService.createInstanceCreatedLog(instance);
  }

  async removeInstance(instanceId: string, message?: string) {

    if(!this.instances.has(instanceId))return;
    
    this.eventLogsService.createInstanceTerminatedLog(this.instances.get(instanceId) as Instance, message ? message : "Terminated By User");

    this.instances.delete(instanceId);
    this.instanceIdToPk.delete(instanceId);
    this.instanceIdToConfig.delete(instanceId);

    await this.instancesService.terminate(instanceId)
  }
}
