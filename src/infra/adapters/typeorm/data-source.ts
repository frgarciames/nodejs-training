import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'
import {
  CandidacyAdapter,
  ClientAdapter,
  JobRequestAdapter,
  PlacementAdapter,
  UserAdapter,
} from './entities'
import { AuthAdapter } from './entities/Auth'
import { RoleAdapter } from './entities/Role'

const config: DataSourceOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    CandidacyAdapter,
    UserAdapter,
    ClientAdapter,
    JobRequestAdapter,
    PlacementAdapter,
    RoleAdapter,
    AuthAdapter,
  ],
  migrations: [],
  subscribers: [],
  dropSchema: true,
}

export const AppDataSource = new DataSource(config)

export const { manager: entityManager } = AppDataSource
