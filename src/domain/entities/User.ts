import { UUID } from '../shared'
import { Auth } from './Auth'
import { Candidacy } from './Candidacy'
import { Placement } from './Placement'

export interface User {
  id: UUID
  name: string
  availability: string
  email: string
  country: string
  auth: Auth
  candidacies: Candidacy[]
  placements: Placement[]
}
