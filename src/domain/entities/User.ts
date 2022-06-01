import { UUID } from '../shared'
import { Candidacy } from './Candidacy'
import { Placement } from './Placement'

export interface User {
  id: UUID
  name: string
  availability: string
  email: string
  country: string
  candidacies: Candidacy[]
  placements: Placement[]
}
