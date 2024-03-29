import { Body, Controller, Post, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './localAuth.guard';
import { RegisterDTO } from './dto/registerDto';
import { UsersService } from '../users/users.service';
import { SYSTEM_USER, UserInsert } from '../users/entities/user.entity';
import { ServerErrors } from 'src/shared/serverErrors';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('auth/register')
  async register(@Body() payload: RegisterDTO): Promise<{ userId: number }> {
    const emailVerificationCode = this.usersService.generateEmailVerificationCode();
    const createdBy: User = SYSTEM_USER;

    const userWithEmail = await this.usersService.findByField('email', payload.email);
    if (userWithEmail.length > 0) {
      throw new BadRequestException(ServerErrors.EMAIL_EXISTS);
    }

    const userData: UserInsert = {
      ...payload,
      emailVerificationCode,
      createdBy,
    };

    const user = await this.usersService.create(userData);

    return { userId: user.id };
  }

  // @ApiEndpoint({
  //   tags: ['Auth'],
  //   response: { status: 201, description: 'The user has been successfully registered.' },
  //   noAuthToken: true,
  // })
  // @ApiResponse({ status: 400, description: ServerErrors.EMAIL_EXISTS })
  // @Post('auth/register')
  // async register(@Body() payload: RegisterDTO): Promise<{ userId: number }> {
  //   const emailVerificationCode
  //     = this.usersService.generateEmailVerificationCode();

  //   const userWithEmailFromPayload = firstItem(
  //     await this.usersService.findByField('email', payload.email),
  //   );

  //   if (userWithEmailFromPayload) {
  //     throw new BadRequestException(ServerErrors.EMAIL_EXISTS);
  //   }

  //   const userData: UserInsert = {
  //     ...payload,
  //     emailVerificationCode,
  //     createdBy: SYSTEM_USER,
  //   };
  //   const user = await this.usersService.create(userData);

  //   await this.mailService.sendConfirmationAccount({
  //     to: user,
  //     emailVerificationCode,
  //   });

  //   return { userId: user.id };
  // }

  // @ApiEndpoint({
  //   tags: ['Auth'],
  //   response: { status: 201, description: 'An email verification code has been resent' },
  //   noAuthToken: true,
  // })
  // @ApiResponse({ status: 403, description: ServerErrors.INACTIVE_ACCOUNT })
  // @Post('auth/resend-email-verification')
  // async resendEmailVerification(@Body() payload: ResendEmailVerificationDto): Promise<{ userId: number }> {
  //   const user = firstItem(await (this.usersService.findByField('email', payload.email)));

  //   if (!user) {
  //     throw new NotFoundException(ServerErrors.USER_EMAIL_NOT_FOUND);
  //   }

  //   assertUserIsActive(user);

  //   const emailVerificationCode = this.usersService.generateEmailVerificationCode();

  //   const userData = {
  //     emailVerificationCode,
  //     updatedBy: SYSTEM_USER,
  //   };
  //   const updatedUser = await this.usersService.update({
  //     entity: user,
  //     updates: {
  //       ...userData,
  //     },
  //   });

  //   await this.mailService.sendConfirmationAccount({
  //     to: updatedUser,
  //     emailVerificationCode,
  //     accountIsCreatedByAdmin: updatedUser.createdByUserId !== updatedUser.id,
  //   });

  //   return { userId: user.id };
  // }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Body() loginDto: LoginDto) {
  //   const user = await this.authService.validateUser(
  //     loginDto.email,
  //     loginDto.password,
  //   );
  //   if (user) {
  //     return this.authService.login(user);
  //   }
  //   // Handle login failure (e.g., throw an exception)
  // }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    // 'req.user' contains the authenticated user information after passing LocalAuthGuard
    return this.authService.login(req.user);
  }

  // ... other methods and endpoints
}
