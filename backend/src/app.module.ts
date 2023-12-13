import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './core/database/dataSource';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RateLimiterModule } from 'nestjs-rate-limiter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
    }),
    AuthModule,
    RateLimiterModule.register({
      // You can customize these options
      type: 'Memory',
      points: 5, // Number of points
      duration: 60, // Duration in seconds
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
