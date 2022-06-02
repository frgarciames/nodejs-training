import { Auth, Role } from '@/domain/entities'
import { UUID } from '@/domain/shared'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { RoleAdapter } from './Role'

@Entity({ name: 'Auths' })
export class AuthAdapter implements Auth {
  @PrimaryGeneratedColumn()
  id: UUID

  @Column()
  email: string

  @Column()
  password: string

  @ManyToMany(() => RoleAdapter, (role) => role.auths, { cascade: true })
  @JoinTable({
    name: 'Auths_Roles',
    joinColumn: { name: 'authId' },
    inverseJoinColumn: { name: 'roleId' },
  })
  roles: Role[]
}
