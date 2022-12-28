import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'gw2pug',
  password: 'dolyakmilk',
  database: 'gw2pug-core',
  migrationsRun: true,
  synchronize: false,
  logging: false,
  entities: [__dirname + '/entity/*{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  subscribers: [],
});
