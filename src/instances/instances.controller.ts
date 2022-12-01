import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { InstancesService } from './instances.service';
import { CreateInstanceDto } from './dto/create-instance.dto';
import { UpdateInstanceDto } from './dto/update-instance.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { InstanceOwnerGuard } from 'src/auth/guards/owner.guards';

@UseGuards(JwtAuthGuard)
@Controller('instances')
export class InstancesController {
  constructor(private readonly instancesService: InstancesService) {}

  @Post()
  create(@Req() req: any, @Body() createInstanceDto: CreateInstanceDto) {
    return this.instancesService.create(createInstanceDto, req.user.userId);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.instancesService.findAllByUser(req.user.userId);
  }

  @UseGuards(InstanceOwnerGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instancesService.findOne(id);
  }

  // @UseGuards(InstanceOwnerGuard)
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateInstanceDto: UpdateInstanceDto,
  // ) {
  //   return this.instancesService.update(id, updateInstanceDto);
  // }

  @UseGuards(InstanceOwnerGuard)
  @Patch('terminate/:id')
  terminate(@Param('id') id: string) {
    return this.instancesService.terminate(id);
  }

  @UseGuards(InstanceOwnerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instancesService.remove(id);
  }
}
