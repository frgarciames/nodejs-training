import { Auth } from '@/domain/entities'
import { AuthRepository } from '@/domain/repositories/auth.repository'
import { entityManager } from '../data-source'
import { AuthAdapter } from '../entities/Auth'
import { comparePassword } from '@/domain/helpers/bcrypt'

export class TypeOrmAuthRepository implements AuthRepository {
  async findById(id: string): Promise<Auth | null> {
    return await entityManager.findOne(AuthAdapter, {
      where: { id },
      relations: ['roles'],
    })
  }
  async findByEmail(email: string): Promise<Auth | null> {
    return await entityManager.findOne(AuthAdapter, {
      where: { email },
      relations: ['roles'],
    })
  }
  async create(entity: Omit<Auth, 'id'>): Promise<Auth> {
    return await entityManager.save(AuthAdapter, entity)
  }
  async delete(id: string): Promise<void> {
    await entityManager.delete(AuthAdapter, { id })
  }
  async update(entity: Partial<Auth>): Promise<Auth> {
    const updateResult = await entityManager.update(
      AuthAdapter,
      {
        id: entity.id,
      },
      entity
    )
    if (updateResult.affected === 0) return null
    return await this.findByEmail(entity.email)
  }
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await comparePassword(password, hash)
  }
}
