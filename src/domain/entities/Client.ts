import { UUID } from '../shared'
import { JobRequest } from './JobRequest'
import { Placement } from './Placement'

export interface Client {
  id: UUID
  name: string
  country: string
  jobRequests: JobRequest[]
  placements: Placement[]
}
