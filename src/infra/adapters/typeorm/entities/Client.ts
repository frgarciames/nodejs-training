import { Auth, Client, JobRequest, Placement } from '@/domain/entities'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { AuthAdapter } from './Auth'
import { JobRequestAdapter } from './JobRequest'
import { PlacementAdapter } from './Placement'

@Entity({ name: 'Clients' })
export class ClientAdapter implements Client {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  country: string

  @Column()
  name: string

  @OneToOne(() => AuthAdapter, { cascade: true })
  @JoinColumn()
  auth: Auth

  @OneToMany(() => JobRequestAdapter, (jobRequest) => jobRequest.client, { cascade: true })
  jobRequests: JobRequest[]

  @OneToMany(() => PlacementAdapter, (placement) => placement.client, { cascade: true })
  placements: Placement[]
}
