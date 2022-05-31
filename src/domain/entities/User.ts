import { UUID } from '../shared'
import { Candidacy } from './Candidacy'

export interface User {
  id: UUID
  name: string
  availability: string
  email: string
  country: string
  candidacies: Candidacy[]
}
