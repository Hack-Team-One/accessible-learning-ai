import { DataSource } from 'typeorm';
import { User } from '../../modules/users/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres', // or another database type
  host: 'localhost', // database host
  port: 5432, // database port
  username: 'username', // database username
  password: 'password', // database password
  database: 'database', // database name
  entities: [User], // add all your entities here
  synchronize: true, // set to false in production
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
