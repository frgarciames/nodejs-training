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
import { User } from '@/domain/entities'
import isEmptyValue from '@/domain/validations/is-empty-value'
import { verifyToken } from '../middlewares/auth'

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
  @before([isValidBodyParamValidation(isValidEmail, ['email'])])
  async updateUser(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params
    const updatedUser = await this.userRepository.update({ id, ...req.body })
    if (!updatedUser) return notFoundException(res, 'user')
    res.send(updatedUser)
  }

  @POST()
  @before([
    isValidBodyValidation([isUser]),
    isValidBodyParamValidation(isValidEmail, ['email']),
    verifyToken,
  ])
  async createUser(req: Request, res: Response, _next: NextFunction) {
    console.log(req.headers)
    return res.send({})
    const { auth, ...user } = req.body as User
    // const authInDb = await this.authRepository.findById(auth.id)
    // if (!authInDb) return notFoundException(res, 'auth')
    const createdUser = await this.userRepository.create({
      ...user,
      auth,
    })
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
