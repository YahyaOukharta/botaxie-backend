import { Module, Scope } from '@nestjs/common';
import { InstanceLogsService } from './instance-logs.service';
import { InstanceLogsGateway } from './instance-logs.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstanceLog } from './entities/instance-log.entity';
import { InstanceLogsController } from './instance-logs.controller';
import { InstancesModule } from 'src/instances/instances.module';
import { AuthModule } from 'src/auth/auth.module';
import { Instance } from 'src/instances/entities/instance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstanceLog, Instance])],
  providers: [
    InstanceLogsGateway,
    {
      useClass: InstanceLogsService,
      provide: "INSTANCE_LOGS_SERVICE",
    }
  ],
  controllers: [InstanceLogsController],
})
export class InstanceLogsModule { }
