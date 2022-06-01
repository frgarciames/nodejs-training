import { Candidacy, Placement, User } from '@/domain/entities'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
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

  @OneToMany(() => CandidacyAdapter, (candidacy) => candidacy.user, { cascade: true })
  candidacies: Candidacy[]

  @OneToMany(() => PlacementAdapter, (placement) => placement.user, { cascade: true })
  placements: Placement[]
}
