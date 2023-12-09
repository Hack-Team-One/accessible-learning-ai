import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface IEnvConfig {
  [key: string]: string | undefined;
}

export class ConfigService {
  private readonly envConfig: IEnvConfig;

  constructor() {
    dotenv.config(); // This loads the .env file into process.env
    const config = this.parseEnv();
    this.envConfig = this.validateInput(config);
  }

  private parseEnv(): IEnvConfig {
    const ENV_VARIABLES = [
      'DATABASE_HOST',
      'DATABASE_PORT',
      'DATABASE_NAME',
      'DATABASE_USERNAME',
      'DATABASE_PASSWORD',
      'AUTH_JWT_SECRET',
      'JWT_TOKEN_EXPIRES',
    ];

    return ENV_VARIABLES.reduce((obj: any, variable) => {
      if (process.env[variable]) {
        obj[variable] = process.env[variable];
      }
      return obj;
    }, {});
  }

  private validateInput(envConfig: IEnvConfig): IEnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      DATABASE_HOST: Joi.string().default('localhost'),
      DATABASE_PORT: Joi.number().port().default(5432),
      DATABASE_NAME: Joi.string().required(),
      DATABASE_USERNAME: Joi.string().required(),
      DATABASE_PASSWORD: Joi.string().required(),
      AUTH_JWT_SECRET: Joi.string().required(),
      JWT_TOKEN_EXPIRES: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } =
      envVarsSchema.validate(envConfig);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }

  get(key: string, defaultValue: string | number = '') {
    return this.envConfig[key] || defaultValue;
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.get('DATABASE_HOST') as string, // Cast to string
      port: parseInt(this.get('DATABASE_PORT', '5432') as string, 10), // Ensure it's a number
      username: this.get('DATABASE_USERNAME') as string,
      password: this.get('DATABASE_PASSWORD') as string,
      database: this.get('DATABASE_NAME') as string,
      // ... other TypeORM configurations
    };
  }
}
