import { User } from '../entities'

export function isUser(obj: any): obj is User {
  if (!obj.availability || !obj.country || !obj.name) {
    return false
  }
}
