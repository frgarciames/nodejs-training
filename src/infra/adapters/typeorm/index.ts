import { AppDataSource } from './data-source'
import { ClientAdapter, JobRequestAdapter, PlacementAdapter } from './entities'
import { CandidacyAdapter } from './entities/Candidacy'
import { UserAdapter } from './entities/User'

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

const seedData = async () => {
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
  const clients = await AppDataSource.manager.find(ClientAdapter)
  const jobRequests = await AppDataSource.manager.find(JobRequestAdapter)
  const candidacies = await AppDataSource.manager.find(CandidacyAdapter)
  const placements = await AppDataSource.manager.find(PlacementAdapter)
  console.log('Loaded users: ', users)
  console.log('Loaded clients: ', clients)
  console.log('Loaded jobRequests: ', jobRequests)
  console.log('Loaded candidacies: ', candidacies)
  console.log('Loaded placements: ', placements)
}
