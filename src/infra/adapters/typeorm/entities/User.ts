import { Candidacy, User } from '@/domain/entities'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CandidacyAdapter } from './Candidacy'

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

  @OneToMany(() => CandidacyAdapter, (candidacy) => candidacy.user, {})
  candidacies: Candidacy[]
}
