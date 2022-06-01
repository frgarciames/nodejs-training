import { User } from '../entities'
import { Repository } from './generic'

export interface UserRepository extends Repository<User> {}
