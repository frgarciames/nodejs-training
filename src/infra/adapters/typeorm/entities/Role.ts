import { Auth, Role } from '@/domain/entities'
import { UUID } from '@/domain/shared'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { AuthAdapter } from './Auth'

@Entity({ name: 'Roles' })
export class RoleAdapter implements Role {
  @PrimaryGeneratedColumn('uuid')
  id: UUID

  @Column()
  slug: string

  @ManyToMany(() => AuthAdapter, (auth) => auth.roles)
  auths: Auth[]
}
