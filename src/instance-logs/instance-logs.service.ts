import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInstanceLogDto } from './dto/create-instance-log.dto';
import { InstanceLog } from './entities/instance-log.entity';

@Injectable()
export class InstanceLogsService {

  constructor(@InjectRepository(InstanceLog) private instanceLogsRepo: Repository<InstanceLog>){

  }

  private async create(createInstanceLogDto: CreateInstanceLogDto)
  {

    // emit here ?

    return this.instanceLogsRepo.save(createInstanceLogDto);
  }

  newInstanceLog(userId: string, instanceId: string, content: string){
    return this.create({userId, instanceId, log: content});
  }

  async findAll(instanceId : string, userId: string) {
   const logs = await this.instanceLogsRepo.find({where:{instanceId,userId}});
   if (logs.length)
    return logs.map((l)=>l.timestamp+" "+l.log)
    throw new UnauthorizedException("Not owner of instance");
  }

}
