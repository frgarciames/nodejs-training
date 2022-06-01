import 'dotenv/config'
import { initDB } from '../infra/adapters/typeorm'
import { initApi } from '../infra/adapters/api'

export const startApplication = async () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await initDB()
      await initApi()
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}
