import { Controller, Get, Inject, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { InstanceOwnerGuard } from 'src/auth/guards/owner.guards';
import { InstanceLogsService } from './instance-logs.service';

@UseGuards(JwtAuthGuard)
@Controller('instance-logs')
export class InstanceLogsController {

    constructor(@Inject("INSTANCE_LOGS_SERVICE") private instanceLogsService: InstanceLogsService) {

    }

    // @UseGuards(InstanceOwnerGuard)
    @Get(":id")
    getAllForInstance(@Req() req:any,@Param('id') id: string) {
        return this.instanceLogsService.findAll(id, req.user.userId);
    }

}
