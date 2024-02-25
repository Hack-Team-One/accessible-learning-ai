// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '../../shared/services/config/config.service';
import { Await } from 'src/shared/type-helpers';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('AUTH_JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const users = await this.usersService.findByField('email', payload.email);
    if (users.length === 0) {
      return null;
    }
    const user = users[0];
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

export type ValidatedUser = Await<ReturnType<JwtStrategy['validate']>>;
