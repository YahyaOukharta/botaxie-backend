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
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ConfigOwnerGuard } from 'src/auth/guards/owner.guards';
import { ConfigurationsService } from './configurations.service';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';

@UseGuards(JwtAuthGuard)
@Controller('configurations')
export class ConfigurationsController {
  constructor(private readonly configurationsService: ConfigurationsService) {}

  @Post()
  create(
    @Req() req: any,
    @Body() createConfigurationDto: CreateConfigurationDto,
  ) {
    return this.configurationsService.create(
      createConfigurationDto,
      req.user.userId,
    );
  }

  @Get()
  findAllByUser(@Req() req: any) {
    return this.configurationsService.findAllByUser(req.user.userId);
  }

  @UseGuards(ConfigOwnerGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configurationsService.findOne(id);
  }

  @UseGuards(ConfigOwnerGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConfigurationDto: UpdateConfigurationDto,
  ) {
    return this.configurationsService.update(id, updateConfigurationDto);
  }

  @UseGuards(ConfigOwnerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configurationsService.remove(id);
  }
}
