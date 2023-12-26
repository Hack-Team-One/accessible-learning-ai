import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    @Body()
    userData: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
  ) {
    const { email, password, firstName, lastName } = userData;
    return this.usersService.create(email, password, firstName, lastName);
  }

  // @Get()
  // async getAllUsers() {
  //   return this.usersService.findAll();
  // }
}
