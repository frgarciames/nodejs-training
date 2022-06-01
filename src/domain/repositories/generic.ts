import { UUID } from '../shared'

export interface Repository<T> {
  findAll(): Promise<T[]>
  findById(id: UUID): Promise<T | null>
  create(entity: Omit<T, 'id'>): Promise<T>
  update(entity: Partial<T>): Promise<T>
  delete(id: UUID): Promise<void>
}
