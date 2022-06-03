import { Client, JobRequest } from '@/domain/entities'
import { UUID } from '@/domain/shared'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ClientAdapter } from './Client'

@Entity({ name: 'JobRequests' })
export class JobRequestAdapter implements JobRequest {
  @PrimaryGeneratedColumn('uuid')
  id: UUID

  @Column()
  jobFunction: string

  @ManyToOne(() => ClientAdapter, (client) => client.jobRequests)
  client: Client
}
