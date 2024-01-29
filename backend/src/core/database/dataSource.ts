import { DataSource } from 'typeorm';
import { User } from '../../modules/users/entities/user.entity';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export const AppDataSource = new DataSource({
  type: (process.env.DATABASE_TYPE as any) || 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User],
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
