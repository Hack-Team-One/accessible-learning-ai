import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './core/database/dataSource';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Add any additional imports here

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
    }),
    AuthModule,
    // Add ConfigurationModule, other modules, and any additional setup here
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Add global guards, interceptors, pipes, logging, and monitoring providers here
  ],
})
export class AppModule {}
