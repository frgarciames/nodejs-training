import { Auth, Candidacy, Placement, User } from '@/domain/entities'
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { AuthAdapter } from './Auth'
import { CandidacyAdapter } from './Candidacy'
import { PlacementAdapter } from './Placement'

@Entity({ name: 'Users' })
export class UserAdapter implements User {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  country: string

  @Column()
  email: string

  @Column()
  name: string

  @Column()
  availability: string

  @OneToOne(() => AuthAdapter, { cascade: true })
  @JoinColumn()
  auth: Auth

  @OneToMany(() => CandidacyAdapter, (candidacy) => candidacy.user, { cascade: true })
  candidacies: Candidacy[]

  @OneToMany(() => PlacementAdapter, (placement) => placement.user, { cascade: true })
  placements: Placement[]
}
