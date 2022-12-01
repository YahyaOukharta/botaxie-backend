import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { ConfigurationsService } from 'src/configurations/configurations.service';
import { InstancesService } from 'src/instances/instances.service';

@Injectable()
export class ConfigOwnerGuard implements CanActivate {
  constructor(private configService: ConfigurationsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const config = await this.configService.findOne(req.params.id);
    return config && config.userId === user.userId;
  }
}

@Injectable()
export class InstanceOwnerGuard implements CanActivate {
  constructor(private instanceService: InstancesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const instance = await this.instanceService.findOne(req.params.id);
    return !!(instance && instance.userId === user.userId);
  }
}
