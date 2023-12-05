import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { ConfigService } from '../path/to/config.service';

export const JwtModule = NestJwtModule.registerAsync({
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('AUTH_JWT_SECRET'),
    signOptions: { expiresIn: configService.get('JWT_TOKEN_EXPIRES') },
  }),
  inject: [ConfigService],
});
