import 'reflect-metadata'
import { DataSource } from 'typeorm'
import {
  CandidacyAdapter,
  ClientAdapter,
  JobRequestAdapter,
  PlacementAdapter,
  UserAdapter,
} from './entities'
import { AuthAdapter } from './entities/Auth'
import { RoleAdapter } from './entities/Role'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
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
})

export const { manager: entityManager } = AppDataSource
