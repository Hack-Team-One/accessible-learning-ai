import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

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
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      email,
      password: hashedPassword,
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

  // ^ incorporate this into the create user && register auth service functions
}
