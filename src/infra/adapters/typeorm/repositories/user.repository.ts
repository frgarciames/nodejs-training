import { User } from '@/domain/entities'
import { Repository } from '@/domain/repositories/generic'
import { UUID } from '@/domain/shared'
import { entityManager } from '../data-source'
import { UserAdapter } from '../entities'

export class UserRepository implements Repository<User> {
  async findAll(): Promise<User[]> {
    return await entityManager.find(UserAdapter)
  }
  async findById(id: UUID): Promise<User | null> {
    return await entityManager.findOneBy(UserAdapter, {
      id,
    })
  }
  async create(user: Omit<User, 'id'>): Promise<User> {
    return await entityManager.save(UserAdapter, user)
  }
  async update(user: Partial<User>): Promise<User> {
    const updatedUser = await entityManager.update(UserAdapter, { id: user.id }, user)
    return updatedUser[0]
  }
  async delete(id: UUID): Promise<void> {
    await entityManager.delete(UserAdapter, { id })
  }
}
