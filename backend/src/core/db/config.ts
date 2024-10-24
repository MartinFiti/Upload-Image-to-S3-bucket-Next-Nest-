import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Entities } from '../../entities';
import * as dotenv from 'dotenv';
dotenv.config();

const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: Object.values(Entities),
  synchronize: true,
  logging: false,
};

export default databaseConfig;
