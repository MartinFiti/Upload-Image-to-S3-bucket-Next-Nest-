import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteResult } from 'typeorm';

@Controller('users')
export class UsersController {

  constructor(private _usersService : UsersService ) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this._usersService.getAllUsers();
  }

  @Post('')
  async createUser(
    @Body() newUser: CreateUserDto
  ): Promise<User> {
    return this._usersService.createUser(newUser);
  }

  @Delete(':uuid')
  async deleteUser(
    @Param('uuid') uuid: string
  ): Promise<DeleteResult> {
    return this._usersService.deleteUser(uuid);
  }
}
