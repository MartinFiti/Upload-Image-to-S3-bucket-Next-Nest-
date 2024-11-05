import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FmsService } from '../fms/fms.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private _userRepository : Repository<User>,
    private _fmsService: FmsService,
  ) {}

  getAllUsers() {
    return this._userRepository.find();
  }

  async createUser(user: CreateUserDto) {
    //first check if the user email already exists
    const existingUser = await this._userRepository.findOneBy({ email: user.email });
    if (existingUser) {
      throw new HttpException('User with this email already exists', 400);
    }
    
    return this._userRepository.save(user);
  }

  async deleteUser(uuid: string) {
    const user = await this._userRepository.findOne({ where: { uuid: uuid } });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    if (user.documentPhoto) {
      await this._fmsService.deleteObject(user.documentPhoto);
    }
    return this._userRepository.delete(user.id);
  }
}
