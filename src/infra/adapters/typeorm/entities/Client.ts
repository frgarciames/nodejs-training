import { Client, JobRequest, Placement } from '@/domain/entities'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
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

  @OneToMany(() => JobRequestAdapter, (jobRequest) => jobRequest.client, { cascade: true })
  jobRequests: JobRequest[]

  @OneToMany(() => PlacementAdapter, (placement) => placement.client, { cascade: true })
  placements: Placement[]
}
