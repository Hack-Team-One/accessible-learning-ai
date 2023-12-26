import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(
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

  async findOne(criteria: Partial<User>): Promise<User | undefined> {
    return this.usersRepository.findOneBy(criteria);
  }

  async generateEmailVerificationCode(): Promise<string> {
    return Math.random().toString(36).substring(2, 15);
  }
}
