import { Candidacy, Client, Placement, User } from '@/domain/entities'
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
import { CandidacyAdapter } from './Candidacy'
import { ClientAdapter } from './Client'
import { UserAdapter } from './User'

@Entity({ name: 'Placements' })
export class PlacementAdapter implements Placement {
  @PrimaryGeneratedColumn('uuid')
  id: UUID

  @ManyToOne(() => UserAdapter, (user) => user.placements, { nullable: true })
  user?: User

  @ManyToOne(() => ClientAdapter, (client) => client.placements)
  client: Client

  @OneToOne(() => CandidacyAdapter)
  @JoinColumn()
  candidacy: Candidacy
}
