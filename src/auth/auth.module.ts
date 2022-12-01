import { Inject, Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { ConfigurationsModule } from 'src/configurations/configurations.module';

import * as dotenv from 'dotenv';
import { ConfigOwnerGuard } from './guards/owner.guards';
import { InstancesModule } from 'src/instances/instances.module';
import { Configuration } from 'src/configurations/entities/configuration.entity';
import { Instance } from 'src/instances/entities/instance.entity';
dotenv.config();

@Module({
  imports: [
    UsersModule,
    ConfigurationsModule,
    InstancesModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXP },
    }),
    TypeOrmModule.forFeature([User,Configuration, Instance]),
  ],
  providers: [LocalStrategy, JwtStrategy, AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
