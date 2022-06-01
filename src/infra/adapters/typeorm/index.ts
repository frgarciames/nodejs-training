import { AppDataSource } from './data-source'
import { ClientAdapter, JobRequestAdapter, PlacementAdapter } from './entities'
import { CandidacyAdapter } from './entities/Candidacy'
import { UserAdapter } from './entities/User'

// USER CREATES CANDIDACY => CANDIDACY TRANSFORMS TO JOBREQUEST => JOBREQUEST IS RECEIVED BY CLIENT => CLIENT CREATES PLACEMENT FROM CANDIDACY

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
      user.placements = []

      const candidacy = new CandidacyAdapter()
      candidacy.status = 'full'

      const client = new ClientAdapter()
      client.country = 'FR'
      client.name = 'Client'
      client.placements = []
      client.jobRequests = []

      const jobRequest = new JobRequestAdapter()
      jobRequest.jobFunction = 'Front-end'

      const placement = new PlacementAdapter()

      candidacy.jobRequest = jobRequest
      candidacy.placement = placement
      user.candidacies.push(candidacy)
      user.placements.push(placement)
      client.jobRequests.push(jobRequest)
      client.placements.push(placement)

      await AppDataSource.manager.save(client)
      await AppDataSource.manager.save(user)
      console.log('Saved a new user with id: ' + user.id)

      console.log('Loading users from the database...')
      const users = await AppDataSource.manager.find(UserAdapter)
      console.log('Loaded users: ', users)

      console.log('Here you can setup and run express / fastify / any other framework.')
    })
    .catch((error) => console.log(error))
}
