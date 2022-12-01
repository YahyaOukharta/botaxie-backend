import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { Configuration } from './entities/configuration.entity';

@Injectable()
export class ConfigurationsService {
  constructor(
    @InjectRepository(Configuration)
    private configRepo: Repository<Configuration>,
  ) {}

  create(createConfigurationDto: CreateConfigurationDto, userId: string) {
    return this.configRepo.save({
      userId,
      json: JSON.stringify(createConfigurationDto),
      name: createConfigurationDto.name,
    });
  }

  findAll() {
    return this.configRepo.find();
  }

  findAllByUser(userId: string) {
    return this.configRepo.find({ where: { userId } });
  }

  async findOne(id: string) {
    const config = await this.configRepo.findOne({ where: { configId: id } });
    if (config) return config;
    throw new NotFoundException();
  }

  async update(id: string, updateConfigurationDto: UpdateConfigurationDto) {
    const config = await this.configRepo.findOne({ where: { configId: id } });
    if (!config) throw new NotFoundException();
    const json = { ...JSON.parse(config.json), ...updateConfigurationDto };
    const name = updateConfigurationDto.name
      ? updateConfigurationDto.name
      : config.name;
    return this.configRepo.save({
      ...config,
      json: JSON.stringify(json),
      name,
    });
  }

  remove(id: string) {
    return this.configRepo.delete(id);
  }
}
