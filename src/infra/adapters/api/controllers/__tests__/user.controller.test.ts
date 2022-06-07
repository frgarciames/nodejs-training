import { User } from '@/domain/entities'
import { AuthRepository } from '@/domain/repositories/auth.repository'
import { UserRepository } from '@/domain/repositories/user.repository'
import { TypeOrmAuthRepository } from '@/infra/adapters/typeorm/repositories/auth.repository'
import { TypeOrmUserRepository } from '@/infra/adapters/typeorm/repositories/user.repository'
import { createRequest, createResponse } from 'node-mocks-http'
import UsersController from '../user.controller'

const mockedUser: User = {
  id: 'test',
  name: 'test',
  email: 'asdfa@asdfa.com',
  availability: 'full',
  country: 'ES',
  candidacies: [],
  placements: [],
  auth: {
    id: 'testauth',
    email: 'auth@test.com',
    password: 'test',
    roles: [
      {
        id: 'test',
        slug: 'user',
      },
    ],
  },
}
jest.mock('@/infra/adapters/typeorm/data-source.ts', () => {
  return {
    entityManager: {
      findOne: () => {},
    },
  }
})
jest.mock('@/infra/adapters/api/middlewares/auth.ts', () => {
  return {
    authenticate: (req, res, next) => {
      req.auth = { id: mockedUser.auth.id, email: mockedUser.auth.email }
      next()
    },
  }
})

describe('user repository in user controller request, response', () => {
  let userRepository: UserRepository
  let authRepository: AuthRepository
  let userController: UsersController

  beforeEach(() => {
    userRepository = new TypeOrmUserRepository()
    userRepository.findByAuthId = jest.fn().mockResolvedValue(mockedUser)
    userRepository.findById = jest.fn().mockResolvedValue(mockedUser)
    userRepository.findAll = jest.fn().mockResolvedValue([mockedUser])
    userRepository.create = jest.fn().mockResolvedValue(mockedUser)
    userRepository.update = jest.fn().mockResolvedValue(mockedUser)
    userRepository.delete = jest.fn().mockResolvedValue(undefined)
    authRepository = new TypeOrmAuthRepository()
    authRepository.findByEmail = jest.fn().mockResolvedValue(mockedUser.auth)
    authRepository.findById = jest.fn().mockResolvedValue(mockedUser.auth)
    authRepository.create = jest.fn().mockResolvedValue(mockedUser.auth)
    authRepository.update = jest.fn().mockResolvedValue(mockedUser.auth)
    authRepository.delete = jest.fn().mockResolvedValue(undefined)
    userController = new UsersController({ userRepository, authRepository })
  })

  it('should get user', async () => {
    const req = createRequest({
      method: 'GET',
      params: {
        id: mockedUser.id,
      },
    })
    const res = createResponse()
    await userController.getUserById(req, res, () => {})
    expect(userRepository.findById).toHaveBeenCalled()
    expect(res._getData()).toEqual(mockedUser)
  })

  it('should get all users', async () => {
    const req = createRequest({
      method: 'GET',
    })
    const res = createResponse()
    await userController.getAll(req, res, () => {})
    expect(userRepository.findAll).toHaveBeenCalled()
    expect(res._getData()).toEqual([mockedUser])
  })

  it('should create user', async () => {
    userRepository.findByAuthId = jest.fn().mockResolvedValue(undefined)
    const req = createRequest({
      method: 'POST',
      body: mockedUser,
      auth: {
        id: mockedUser.id,
      },
    })
    const res = createResponse()
    await userController.createUser(req, res, () => {})
    expect(userRepository.create).toHaveBeenCalled()
    expect(res._getData()).toEqual(mockedUser)
  })

  it('should update user', async () => {
    const req = createRequest({
      method: 'PATCH',
      body: mockedUser,
      params: {
        id: mockedUser.id,
      },
      auth: {
        id: mockedUser.id,
      },
    })
    const res = createResponse()
    await userController.updateUser(req, res, () => {})
    expect(userRepository.update).toHaveBeenCalled()
    expect(res._getData()).toEqual(mockedUser)
  })
})
