import { AppDataSource } from './data-source'
import { seedData } from './seed'

// USER CREATES CANDIDACY => CANDIDACY TRANSFORMS TO JOBREQUEST => JOBREQUEST IS RECEIVED BY CLIENT => CLIENT CREATES PLACEMENT FROM CANDIDACY

export const initDB = async () => {
  try {
    await AppDataSource.initialize()
    if (process.env.NODE_ENV === 'development') {
      await seedData()
    }
  } catch (error) {
    console.log(error)
  }
}
