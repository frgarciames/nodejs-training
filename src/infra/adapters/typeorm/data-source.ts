import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { CandidacyAdapter } from './entities/Candidacy'
import { UserAdapter } from './entities/User'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [CandidacyAdapter, UserAdapter],
  migrations: [],
  subscribers: [],
})
