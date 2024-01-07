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

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByField<F extends keyof User>(
    field: F,
    value: User[F],
  ): Promise<User[]> {
    return this.usersRepository.findBy({ [field]: value });
  }

  generateEmailVerificationCode() {
    return generateRandomCodeOrToken();
  }

  generateResetPasswordCode() {
    return generateRandomCodeOrToken();
  }

  // ^ incorporate this into the create user && register auth service functions
}
