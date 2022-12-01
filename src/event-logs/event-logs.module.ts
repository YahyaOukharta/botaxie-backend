import { Module } from '@nestjs/common';
import { EventLogsService } from './event-logs.service';
import { EventLogsController } from './event-logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventLog } from './entities/event-log.entity';
import { InstancesService } from 'src/instances/instances.service';

@Module({
  imports:[TypeOrmModule.forFeature([EventLog])],
  controllers: [EventLogsController],
  providers: [EventLogsService]
})
export class EventLogsModule {}
