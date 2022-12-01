import { forwardRef, Module, Scope } from '@nestjs/common';
import { InstancesService } from './instances.service';
import { InstancesController } from './instances.controller';
import { CronService } from './cron.service';
import { Instance } from './entities/instance.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from 'src/configurations/entities/configuration.entity';
import { EventLogsService } from 'src/event-logs/event-logs.service';
import { EventLog } from 'src/event-logs/entities/event-log.entity';
import { InstanceLogsService } from 'src/instance-logs/instance-logs.service';
import { InstanceLog } from 'src/instance-logs/entities/instance-log.entity';
import { InstanceLogsModule } from 'src/instance-logs/instance-logs.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Instance, Configuration, EventLog, InstanceLog])],
  controllers: [InstancesController],
  providers: [
    InstancesService,
    {
      useClass: CronService,
      provide: 'CRON_SERVICE',
    },
    {
      useClass: EventLogsService,
      provide: 'EVENT_LOGS_SERVICE',
    },
    {
      useClass: InstanceLogsService,
      provide: 'INSTANCE_LOGS_SERVICE',
    },
  ],
})
export class InstancesModule {}
