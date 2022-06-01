import { before, GET, route } from 'awilix-express'
import { UserRepository } from '@/domain/repositories/user.repository'
import areValidParamsValidation from '../validations/are-valid-params.validation'
import notFoundException from '../exceptions/not-found.exception'

@route('/users')
export default class UsersController {
  private userRepository: UserRepository
  constructor({ userRepository }) {
    this.userRepository = userRepository
  }

  @GET()
  async getAll(req, res, _next) {
    const users = await this.userRepository.findAll()
    res.send(users)
  }

  @route('/:id')
  @GET()
  @before([areValidParamsValidation(['id'])])
  async getUserById(req, res, _next) {
    const { id } = req.params
    const user = await this.userRepository.findById(id)
    if (!user) return notFoundException(res, 'user')
    res.send(user)
  }
}
