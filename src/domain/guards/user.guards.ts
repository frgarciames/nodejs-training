import { User } from '../entities'

export function isUser(entity: any): entity is User {
  if (!entity.availability || !entity.country || !entity.name) {
    return false
  }
  return true
}
