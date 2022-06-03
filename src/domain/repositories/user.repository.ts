import { User } from '../entities'
import { UUID } from '../shared'
import { Repository } from './generic'

export interface UserRepository extends Repository<User> {
  findByAuthId(authId: UUID): Promise<User | null>
}
