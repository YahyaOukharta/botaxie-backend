import { Controller, Post, UseGuards, Body, Req, Get } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const salt = 10;
    const hashed = await bcrypt.hash(createUserDto.password, salt);
    await this.authService.create({
      ...createUserDto,
      password: hashed,
    });
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  progile(@Req() req: any) {
    return req.user;
  }
}
