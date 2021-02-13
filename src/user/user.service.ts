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
    const createdUser = this.userRepository.create({ name, email });
    const user = await this.userRepository.save(createdUser);
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
    const userToUpdate = await this.userRepository.findOne(id);
    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }
    const user = await this.userRepository.save({
      ...userToUpdate,
      ...updateUser,
    });
    return user;
  }

  async delete(id: number): Promise<void> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(id);
    return;
  }
}
