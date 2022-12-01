import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findOneById(userId: string) {
    const user = await this.userRepo.findOne({ where: { userId } });
    if (user) return user;
    return undefined;
  }

  async findOne(partial: any) {
    const user = await this.userRepo.findOne({ where: partial });
    if (user) return user;
    return undefined;
  }
  async findAll() {
    return await this.userRepo.find();
  }
}
