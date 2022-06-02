import { User } from '@/domain/entities'
import { Repository } from '@/domain/repositories/generic'
import { UUID } from '@/domain/shared'
import { FindManyOptions } from 'typeorm'
import { entityManager } from '../data-source'
import { UserAdapter } from '../entities'

const findOptions: FindManyOptions<UserAdapter> = {
  relations: {
    auth: {
      roles: true,
    },
  },
  select: {
    auth: {
      email: true,
      roles: true,
    },
  },
}

export class UserRepository implements Repository<User> {
  async findAll(): Promise<User[]> {
    return await entityManager.find(UserAdapter, findOptions)
  }
  async findById(id: UUID): Promise<User | null> {
    return (
      await entityManager.find(UserAdapter, {
        where: { id },
        ...findOptions,
      })
    )[0]
  }
  async create(user: Omit<User, 'id'>): Promise<User> {
    return await entityManager.save(UserAdapter, user)
  }
  async update(partialUser: Partial<User>): Promise<User> {
    const updateResult = await entityManager.update(
      UserAdapter,
      {
        id: partialUser.id,
      },
      partialUser
    )
    if (updateResult.affected === 0) return null
    return await this.findById(partialUser.id)
  }
  async delete(id: UUID): Promise<void> {
    await entityManager.delete(UserAdapter, { id })
  }
}
