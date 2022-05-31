export interface GenericRepository<T> {
  findAll(): Promise<T[]>
  findById(id: number): Promise<T>
  create(entity: Omit<T, 'id'>): Promise<T>
  update(entity: Partial<T>): Promise<T>
  delete(id: number): Promise<void>
}
