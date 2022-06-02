import { UUID } from '../shared'
import { Role } from './Role'

export interface Auth {
  id: UUID
  password: string
  email: string
  roles: Role[]
}
