import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { InstanceLogsService } from './instance-logs.service';
import { CreateInstanceLogDto } from './dto/create-instance-log.dto';
import { Inject } from '@nestjs/common';

@WebSocketGateway()
export class InstanceLogsGateway {
  constructor(@Inject("INSTANCE_LOGS_SERVICE") instanceLogsService: InstanceLogsService) 
    {}

  // @SubscribeMessage('createInstanceLog')
  // create(@MessageBody() createInstanceLogDto: CreateInstanceLogDto) {
  //   return this.instanceLogsService.create(createInstanceLogDto);
  // }

  // @SubscribeMessage('findAllInstanceLogs')
  // findAll() {
  //   return this.instanceLogsService.findAll();
  // }

  // @SubscribeMessage('findOneInstanceLog')
  // findOne(@MessageBody() id: number) {
  //   return this.instanceLogsService.findOne(id);
  // }

  // @SubscribeMessage('updateInstanceLog')
  // update(@MessageBody() updateInstanceLogDto: UpdateInstanceLogDto) {
  //   return this.instanceLogsService.update(
  //     updateInstanceLogDto.id,
  //     updateInstanceLogDto,
  //   );
  // }

  // @SubscribeMessage('removeInstanceLog')
  // remove(@MessageBody() id: number) {
  //   return this.instanceLogsService.remove(id);
  // }
}
