import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  HttpCode,
  Get,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import {
  LoginDto,
  UpdateBalanceDto,
  UpdateUserDto,
  User,
} from '../interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto): Promise<User> {
    return this.usersService.login(loginDto);
  }

  @Put('balance')
  async updateBalance(
    @Body() updateBalanceDto: UpdateBalanceDto,
  ): Promise<User> {
    return this.usersService.updateBalance(updateBalanceDto);
  }

  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }
}
