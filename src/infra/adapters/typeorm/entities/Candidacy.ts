import { Candidacy, JobRequest, User } from '@/domain/entities'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserAdapter } from './User'

@Entity({ name: 'Candidacies' })
export class CandidacyAdapter implements Candidacy {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  status: string

  @ManyToMany(() => UserAdapter, (user) => user.candidacies)
  user: User

  jobRequest: JobRequest
}
