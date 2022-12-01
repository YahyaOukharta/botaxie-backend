import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Instance } from 'src/instances/entities/instance.entity';
import { Repository } from 'typeorm';
import { CreateEventLogDto } from './dto/create-event-log.dto';
import { EventLog } from './entities/event-log.entity';

@Injectable()
export class EventLogsService {

  constructor(@InjectRepository(EventLog) private eventLogsRepo: Repository<EventLog>) {

  }
  private create(createEventLogDto: CreateEventLogDto) {
    return this.eventLogsRepo.save(createEventLogDto);
  }

  createInstanceCreatedLog(instance: Instance) {
    const dto: CreateEventLogDto = {
      userId: instance.userId,
      eventType: 'INSTANCE_CREATED',
      json: JSON.stringify({
        instance,
      })
    }
    return this.create(dto)
  }

  createInstanceTerminatedLog(instance: Instance, message: string) {
    const dto: CreateEventLogDto = {
      userId: instance.userId,
      eventType: 'INSTANCE_TERMINATED',
      json: JSON.stringify({
        instance,
        message,
      })
    }
    return this.create(dto)
  }

  createPurchaseAttemptLog(status: boolean, axieId: string, instance: Instance) {
    const dto: CreateEventLogDto = {
      userId: instance.userId,
      eventType: 'PURCHASE_ATTEMPT',
      json: JSON.stringify({
        axieId,
        instance,
        status,
      })
    }
    return this.create(dto)
  }

  findAllForUser(userId: string) {
    return this.eventLogsRepo.find({where:{userId}})
  }

  removeAllForUser(userId: string) {
    return this.eventLogsRepo.delete({userId});
  }
}
