import { Client } from '../entities'
import { GenericRepository } from './generic'

export interface UserRepository extends GenericRepository<Client> {}
