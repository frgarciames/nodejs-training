import { UUID } from '../shared'
import { JobRequest } from './JobRequest'
import { User } from './User'

export interface Candidacy {
  id: UUID
  jobRequest: JobRequest
  user: User
  status: string
}
