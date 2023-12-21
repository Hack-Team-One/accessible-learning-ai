import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { ConfigService } from '../../shared/services/config/config.service';

export const JwtModule = NestJwtModule.registerAsync({
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('AUTH_JWT_SECRET') as string,
    signOptions: {
      expiresIn: configService.get('JWT_TOKEN_EXPIRES'),
    },
  }),
  inject: [ConfigService],
});
