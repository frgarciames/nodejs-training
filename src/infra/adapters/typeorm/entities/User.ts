import { Auth, Candidacy, Placement, User } from '@/domain/entities'
import { UUID } from '@/domain/shared'
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { AuthAdapter } from './Auth'
import { CandidacyAdapter } from './Candidacy'
import { PlacementAdapter } from './Placement'

@Entity({ name: 'Users' })
export class UserAdapter implements User {
  @PrimaryGeneratedColumn('uuid')
  id: UUID

  @Column()
  country: string

  @Column()
  @Index({ unique: true })
  email: string

  @Column()
  name: string

  @Column()
  availability: string

  @OneToOne(() => AuthAdapter)
  @JoinColumn()
  auth: Auth

  @OneToMany(() => CandidacyAdapter, (candidacy) => candidacy.user, {
    cascade: true,
  })
  candidacies: Candidacy[]

  @OneToMany(() => PlacementAdapter, (placement) => placement.user, {
    cascade: true,
  })
  placements: Placement[]
}
