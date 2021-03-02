import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() { name, email }: CreateUserDTO) {
    const user = this.userService.create({ name, email });
    return user;
  }

  @Get()
  async index() {
    const users = this.userService.index();
    return users;
  }

  @ApiOkResponse({ type: User })
  @Get(':id')
  async show(@Param('id') id: number) {
    const user = this.userService.show(id);
    return user;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUser: UpdateUserDTO) {
    const user = await this.userService.update(id, updateUser);
    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    this.userService.delete(id);
  }
}
