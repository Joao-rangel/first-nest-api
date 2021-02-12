import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create({ name, email }: CreateUserDTO): Promise<User> {
    const createUser = this.userRepository.create({ name, email });
    const user = await this.userRepository.save(createUser);
    return user;
  }

  async index(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async show(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUser: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, { ...updateUser });
    await this.userRepository.update(id, user);
    return user;
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(id);
    return;
  }
}
