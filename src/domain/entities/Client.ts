import { UUID } from '../shared'
import { Auth } from './Auth'
import { JobRequest } from './JobRequest'
import { Placement } from './Placement'

export interface Client {
  id: UUID
  name: string
  country: string
  jobRequests: JobRequest[]
  placements: Placement[]
  auth: Auth
}
