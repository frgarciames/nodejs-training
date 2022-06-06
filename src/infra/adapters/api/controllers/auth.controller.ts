import { Auth, Role } from '@/domain/entities'
import { hashPassword } from '@/domain/helpers/bcrypt'
import { AuthRepository } from '@/domain/repositories/auth.repository'
import { UserRepository } from '@/domain/repositories/user.repository'
import isValidEmail from '@/domain/validations/is-valid-email.validation'
import isValidPassword from '@/domain/validations/is-valid-password'
import { createController } from 'awilix-express'
import { Request, Response } from 'express'
import { RoleAdapter } from '../../typeorm/entities/Role'
import notFoundException from '../exceptions/not-found.exception'
import { signToken } from '../middlewares/auth'
import alreadyExistException from '../validations/already-exist.validation'
import isValidBodyParamValidation from '../validations/is-valid-body-param.validation'

type Args = {
  authRepository: AuthRepository
  userRepository: UserRepository
}

const controller = ({ authRepository, userRepository }: Args) => ({
  async register(req: Request, res: Response) {
    const { email, password } = req.body as Auth
    const authInDb = await authRepository.findByEmail(email)
    if (authInDb) return alreadyExistException(res, ['email', email])
    const passwordHashed = await hashPassword(password)
    const userRole: Role = new RoleAdapter()
    userRole.slug = 'user'
    const auth = await authRepository.create({
      email,
      password: passwordHashed,
      roles: [userRole],
    })
    res.status(201).send(auth)
  },
  async login(req: Request, res: Response) {
    const { email, password } = req.body as Auth
    const authInDb = await authRepository.findByEmail(email)
    if (!authInDb) return notFoundException(res, 'email')
    const isValidPassword = await authRepository.comparePassword(
      password,
      authInDb.password
    )
    if (!isValidPassword) return notFoundException(res, 'email')
    const token = await signToken(authInDb)
    res.header('token', token).json({
      token,
    })
  },
})

export default createController(controller)
  .prefix('/auth')
  .post('/register', 'register', {
    before: [
      isValidBodyParamValidation(isValidEmail, ['email']),
      isValidBodyParamValidation(isValidPassword, ['password']),
    ],
  })
  .post('/login', 'login', {
    before: [isValidBodyParamValidation(isValidEmail, ['email'])],
  })
