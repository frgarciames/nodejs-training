import { hashPassword } from '@/domain/helpers/bcrypt'
import { AppDataSource } from './data-source'
import {
  CandidacyAdapter,
  ClientAdapter,
  JobRequestAdapter,
  PlacementAdapter,
  UserAdapter,
} from './entities'
import { AuthAdapter } from './entities/Auth'
import { RoleAdapter } from './entities/Role'

export const seedData = async () => {
  console.log('Inserting a new user into the database...')

  const userRole = new RoleAdapter()
  userRole.slug = 'user'

  const userRole2 = new RoleAdapter()
  userRole2.slug = 'admin'

  const clientRole = new RoleAdapter()
  clientRole.slug = 'client'

  const authUser = new AuthAdapter()
  authUser.email = 'user@auth.com'
  authUser.password = await hashPassword('pepito1234')

  const authClient = new AuthAdapter()
  authClient.email = 'client@auth.com'
  authClient.password = await hashPassword('pepitobusiness1234')

  const user = new UserAdapter()
  user.name = 'Timber'
  user.email = 'user@app.com'
  user.availability = 'Full-time'
  user.country = 'Brazil'

  const candidacy = new CandidacyAdapter()
  candidacy.status = 'full'

  const client = new ClientAdapter()
  client.country = 'FR'
  client.name = 'Client'

  const jobRequest = new JobRequestAdapter()
  jobRequest.jobFunction = 'Front-end'

  const placement = new PlacementAdapter()

  candidacy.jobRequest = jobRequest
  candidacy.placement = placement

  authUser.roles = [userRole, userRole2]
  user.auth = authUser

  authClient.roles = [clientRole]
  client.auth = authClient

  user.candidacies = [candidacy]
  user.placements = [placement]

  client.jobRequests = [jobRequest]
  client.placements = [placement]

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
