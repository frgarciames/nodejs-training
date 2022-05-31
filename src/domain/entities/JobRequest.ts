import { UUID } from '../shared'
import { Client } from './Client'

export interface JobRequest {
  id: UUID
  client: Client
  jobFunction: string
}
