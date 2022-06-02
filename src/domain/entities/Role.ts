import { UUID } from '../shared'
import { Auth } from './Auth'

export interface Role {
  id: UUID
  slug: string
  auths: Auth[]
}
