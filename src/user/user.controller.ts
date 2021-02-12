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

import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() { name, email }: CreateUserDTO) {
    const user = this.userService.create({ name, email });

    return user;
  }

  @Get()
  index() {
    return this.userService.index();
  }

  @Get(':id')
  async show(@Param('id') id: number) {
    return this.userService.show(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUser: UpdateUserDTO) {
    const user = await this.userService.update(id, updateUser);
    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.userService.delete(id);
  }
}
