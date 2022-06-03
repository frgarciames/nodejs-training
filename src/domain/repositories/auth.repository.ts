import { Auth } from '../entities'
import { UUID } from '../shared'

export interface AuthRepository {
  findById(id: UUID): Promise<Auth | null>
  findByEmail(email: string): Promise<Auth | null>
  create(entity: Omit<Auth, 'id'>): Promise<Auth>
  update(entity: Partial<Auth>): Promise<Auth>
  delete(id: UUID): Promise<void>
  comparePassword(password: string, hash: string): Promise<boolean>
}
