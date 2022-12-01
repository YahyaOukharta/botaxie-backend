import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigurationsModule } from './configurations/configurations.module';
import { InstancesModule } from './instances/instances.module';
import { ActivityLogsModule } from './activity-logs/activity-logs.module';
import { InstanceLogsModule } from './instance-logs/instance-logs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Configuration } from './configurations/entities/configuration.entity';
import { Instance } from './instances/entities/instance.entity';
import { ActivityLog } from './activity-logs/entities/activity-log.entity';
import { InstanceLog } from './instance-logs/entities/instance-log.entity';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EventLogsModule } from './event-logs/event-logs.module';
import { EventLog } from './event-logs/entities/event-log.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Configuration, Instance, ActivityLog, InstanceLog, EventLog],
      synchronize: true,
    }),
    UsersModule,
    ConfigurationsModule,
    InstancesModule,
    ActivityLogsModule,
    AuthModule,
    ScheduleModule.forRoot(),
    EventLogsModule,
    InstanceLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
