import { before, DELETE, GET, PATCH, POST, route } from 'awilix-express'
import { UserRepository } from '@/domain/repositories/user.repository'
import areValidParamsValidation from '../validations/are-valid-params.validation'
import notFoundException from '../exceptions/not-found.exception'
import isValidBodyValidation from '../validations/is-valid-body.validation'
import { isUser } from '@/domain/guards/user.guards'
import isValidBodyParamValidation from '../validations/is-valid-body-param.validation'
import isValidEmailValidation from '@/domain/validations/is-valid-email.validation'
import { NextFunction, Request, Response } from 'express'

@route('/users')
export default class UsersController {
  private userRepository: UserRepository
  constructor({ userRepository }) {
    this.userRepository = userRepository
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
  @before([isValidBodyParamValidation(isValidEmailValidation, ['email'])])
  async updateUser(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params
    const updatedUser = await this.userRepository.update({ id, ...req.body })
    if (!updatedUser) return notFoundException(res, 'user')
    res.send(updatedUser)
  }

  @POST()
  @before([
    isValidBodyValidation([isUser]),
    isValidBodyParamValidation(isValidEmailValidation, ['email']),
  ])
  async createUser(req: Request, res: Response, _next: NextFunction) {
    const createdUser = await this.userRepository.create(req.body)
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
