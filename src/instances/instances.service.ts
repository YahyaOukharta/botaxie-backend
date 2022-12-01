import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Configuration } from 'src/configurations/entities/configuration.entity';
import { Repository } from 'typeorm';
import { CronService } from './cron.service';
import { CreateInstanceDto } from './dto/create-instance.dto';
import { UpdateInstanceDto } from './dto/update-instance.dto';
import { Instance } from './entities/instance.entity';
// import Web3 from 'web3';
const Web3 = require("web3")
import AxieConfig from 'src/types/AxieConfig';
import { Config } from 'prettier';
import { repeatWhen } from 'rxjs';
import e from 'express';
const w3 = new Web3('https://api.roninchain.com/rpc');

@Injectable()
export class InstancesService {
  constructor(
    @InjectRepository(Instance)
    private instanceRepo: Repository<Instance>,

    @InjectRepository(Configuration)
    private configRepo: Repository<Configuration>,

    @Inject('CRON_SERVICE')
    private cronService: CronService,

  ) {
    if (!process.env.MIN_RON_BALANCE)
      throw "MIN_RON_BALANCE is required"
    else this.minRonBalance = parseFloat(process.env.MIN_RON_BALANCE)
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

  findAllByUser(userId: string) {
    return this.instanceRepo.find({ where: { userId } });
  }

  async findOne(instanceId: string) {
    const instance = await this.instanceRepo.findOne({ where: { instanceId } });
    if (!instance) throw new NotFoundException();
    return instance;
  }

  // update(id: string, updateInstanceDto: UpdateInstanceDto) {
  //   return `This action updates a #${id} instance`;
  // }

  async create(createInstanceDto: CreateInstanceDto, userId: string) {
    let instance: any = {
      ...createInstanceDto,
      userId,
      progress: 0,
    };
    const config = await this.configRepo.findOne({
      where: { configId: instance.configId, userId },
    });
    if (!config) throw new UnauthorizedException();
    let wallet;
    try {
      //is wallet valid
      wallet = w3.eth.accounts.privateKeyToAccount(instance.pk);
      //console.log(wallet.address);
    } catch (e) {
      //console.log(e);
      throw new BadRequestException('Invalid wallet private key');
    }
    
    // has enough balance

    // const reqs = this.instanceRequirements(
    //   JSON.parse(config.json),
    //   instance.target,
    // );
    // const wethBalance = await this.getWethBalance(wallet.address);
    // if (wethBalance < reqs.total) {
    //   throw new UnauthorizedException({
    //     message: 'Unsufficient WETH balance',
    //     ...reqs,
    //     balance: wethBalance,
    //   });
    // }
    // const ronBalance = await this.getRonBalance(wallet.address);
    // if (wethBalance < reqs.total) {
    //   throw new UnauthorizedException({
    //     message: 'Unsufficient RON balance',
    //     ronBalance: ronBalance,
    //     required: instance.target * this.minRonBalance
    //   });
    // }

    // saving and launching
    instance = await this.instanceRepo.save({
      ...instance,
      wallet : wallet.address,
      configJson: config.json,
    });
    this.cronService.addInstance(
      {...instance, pk: undefined},
      JSON.parse(instance.configJson),
      instance.pk,
    );
    return { ...instance, pk: undefined };
  }

  async terminate(instanceId: string) {
    this.cronService.removeInstance(instanceId);

    const instance = await this.instanceRepo.findOne({
      where: { instanceId },
    });
    if (!instance) throw new NotFoundException();
    if (instance?.status === 5)
      throw new BadRequestException('Already terminated');
    return await this.instanceRepo.save({ ...instance, status: 5 });
  }

  remove(instanceId: string) {
    this.cronService.removeInstance(instanceId);

    return this.instanceRepo.delete(instanceId);
  }
}
