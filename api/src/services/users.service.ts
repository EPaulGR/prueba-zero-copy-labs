import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import {
  User,
  LoginDto,
  UpdateBalanceDto,
  UpdateUserDto,
} from '../interfaces/user.interface';
import * as path from 'path';

@Injectable()
export class UsersService {
  private db: lowdb.LowdbSync<{ users: User[] }>;

  constructor() {
    const dbPath = path.resolve(__dirname, '../../../data/users.json');
    const adapter = new FileSync<{ users: User[] }>(dbPath);
    this.db = lowdb(adapter);
  }

  async login(loginDto: LoginDto): Promise<User> {
    const user = this.db
      .get('users')
      .find({ email: loginDto.email, password: loginDto.password })
      .value();

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async updateBalance(updateBalanceDto: UpdateBalanceDto): Promise<User> {
    const user = this.db
      .get('users')
      .find({ _id: updateBalanceDto.userId })
      .value();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = {
      ...user,
      balance: updateBalanceDto.newBalance,
    };

    this.db
      .get('users')
      .find({ _id: updateBalanceDto.userId })
      .assign(updatedUser)
      .write();

    return updatedUser;
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = this.db.get('users').find({ _id: userId }).value();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = {
      ...user,
      ...updateUserDto,
      name: {
        ...user.name,
        ...(updateUserDto.name || {}),
      },
    };

    this.db.get('users').find({ _id: userId }).assign(updatedUser).write();

    return updatedUser;
  }
}
