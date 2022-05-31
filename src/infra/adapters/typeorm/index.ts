import { AppDataSource } from './data-source'
import { CandidacyAdapter } from './entities/Candidacy'
import { UserAdapter } from './entities/User'

export const initDB = () => {
  AppDataSource.initialize()
    .then(async () => {
      //   console.log('Clearing database ...')
      //   await AppDataSource.dropDatabase()
      console.log('Inserting a new user into the database...')
      const user = new UserAdapter()
      user.name = 'Timber'
      user.email = 't@adsf.com'
      user.availability = 'Full-time'
      user.country = 'Brazil'
      user.candidacies = []
      const candidacy = new CandidacyAdapter()
      candidacy.status = 'full'
      user.candidacies.push(candidacy)
      await AppDataSource.manager.save(user)
      console.log('Saved a new user with id: ' + user.id)

      console.log('Loading users from the database...')
      const users = await AppDataSource.manager.find(UserAdapter)
      console.log('Loaded users: ', users)

      console.log('Here you can setup and run express / fastify / any other framework.')
    })
    .catch((error) => console.log(error))
}
