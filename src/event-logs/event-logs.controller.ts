import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { EventLogsService } from './event-logs.service';
import { CreateEventLogDto } from './dto/create-event-log.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('event-logs')
export class EventLogsController {
  constructor(private readonly eventLogsService: EventLogsService) {}

  @Get()
  findAllForUser(@Req() req:any) {
    return this.eventLogsService.findAllForUser(req.user.userId);
  }

  @Delete()
  removeAllForUser(@Req() req:any) {
    return this.eventLogsService.removeAllForUser(req.user.userId);
  }
}
