import { UUID } from '../shared'
import { Candidacy } from './Candidacy'
import { Client } from './Client'
import { User } from './User'

export interface Placement {
  id: UUID
  user?: User
  client: Client
  candidacy: Candidacy
}
