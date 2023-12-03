import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; // Assuming you have a User entity defined

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<User> {
    const newUser = this.usersRepository.create({
      email,
      password,
      firstName,
      lastName,
    });
    await this.usersRepository.save(newUser);
    return newUser;
  }
}
