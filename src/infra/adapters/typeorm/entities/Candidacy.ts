import { Candidacy, JobRequest, Placement, User } from '@/domain/entities'
import { UUID } from '@/domain/shared'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { JobRequestAdapter } from './JobRequest'
import { PlacementAdapter } from './Placement'
import { UserAdapter } from './User'

@Entity({ name: 'Candidacies' })
export class CandidacyAdapter implements Candidacy {
  @PrimaryGeneratedColumn('uuid')
  id: UUID

  @Column()
  status: string

  @ManyToOne(() => UserAdapter, (user) => user.candidacies)
  user: User

  @OneToOne(() => JobRequestAdapter)
  @JoinColumn()
  jobRequest: JobRequest

  @OneToOne(() => PlacementAdapter)
  placement: Placement
}
