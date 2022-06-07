import * as _ from 'lodash'
import { before, DELETE, GET, PATCH, POST, route } from 'awilix-express'
import { UserRepository } from '@/domain/repositories/user.repository'
import areValidParamsValidation from '../validations/are-valid-params.validation'
import notFoundException from '../exceptions/not-found.exception'
import isValidBodyValidation from '../validations/is-valid-body.validation'
import { isUser } from '@/domain/guards/user.guards'
import isValidBodyParamValidation from '../validations/is-valid-body-param.validation'
import isValidEmail from '@/domain/validations/is-valid-email.validation'
import { NextFunction, Request, Response } from 'express'
import { AuthRepository } from '@/domain/repositories/auth.repository'
import { Auth, User } from '@/domain/entities'
import { authenticate } from '../middlewares/auth'
import alreadyExistException from '../validations/already-exist.validation'
import unauthorizedException from '../exceptions/unauthorized.exception'

@route('/users')
export default class UsersController {
  private userRepository: UserRepository
  private authRepository: AuthRepository
  constructor({ userRepository, authRepository }) {
    this.userRepository = userRepository
    this.authRepository = authRepository
  }

  @GET()
  async getAll(req: Request, res: Response, _next: NextFunction) {
    const users = await this.userRepository.findAll()
    res.send(users)
  }

  @route('/:id')
  @GET()
  @before([areValidParamsValidation(['id'])])
  async getUserById(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params
    const user = await this.userRepository.findById(id)
    if (!user) return notFoundException(res, 'user')
    res.send(user)
  }

  @route('/:id')
  @PATCH()
  @before([areValidParamsValidation(['id']), authenticate])
  async updateUser(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params
    const authInRequest: Auth = (<any>req).auth
    const userInDb = await this.userRepository.findByAuthId(authInRequest.id)
    if (!userInDb || userInDb.id !== id) return unauthorizedException(res)
    const user = req.body as Partial<User>
    const updatedUser = await this.userRepository.update({ ...user, id })
    if (!updatedUser) return notFoundException(res, 'user')
    res.send(updatedUser)
  }

  @POST()
  @before([
    isValidBodyValidation([isUser]),
    isValidBodyParamValidation(isValidEmail, ['email']),
    authenticate,
  ])
  async createUser(req: Request, res: Response, _next: NextFunction) {
    const user = req.body as User
    const authInRequest = (<any>req).auth
    const auth = await this.authRepository.findById(authInRequest.id)
    if (!auth) return unauthorizedException(res)
    const userInDb = await this.userRepository.findByAuthId(auth.id)
    if (userInDb) return alreadyExistException(res, ['user', 'user'])
    const createdUser = await this.userRepository.create({ ...user, auth })
    if (!createdUser) return notFoundException(res, 'user')
    res.status(201).send(createdUser)
  }

  @route('/:id')
  @DELETE()
  @before([areValidParamsValidation(['id'])])
  async deleteUser(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params
    const user = await this.userRepository.findById(id)
    if (!user) return notFoundException(res, 'user')
    await this.userRepository.delete(id)
    res.send()
  }
}
