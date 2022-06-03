import { loadControllers, scopePerRequest } from 'awilix-express'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as compression from 'compression'
import { asClass, createContainer } from 'awilix'
import { TypeOrmUserRepository } from '../typeorm/repositories/user.repository'
import { TypeOrmAuthRepository } from '../typeorm/repositories/auth.repository'

export const initApi = async () => {
  const app = express()
  const container = createContainer().register({
    userRepository: asClass(TypeOrmUserRepository).singleton(),
    authRepository: asClass(TypeOrmAuthRepository).singleton(),
  })

  app.use(compression())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(scopePerRequest(container))
  app.use(loadControllers('controllers/*.controller.ts', { cwd: __dirname }))
  app.get('/', (req, res) => res.send('API under construction'))
  app.get('/json', (req, res) =>
    res.send({
      name: 'edgar',
      occupation: 'developer',
    })
  )
  app.get('/query', (req, res) => {
    res.send(
      Object.entries(req.query).reduce((prev, [key, value]) => {
        prev[key] = value
        return prev
      }, {})
    )
  })
  app.get('/profile', (req, res) => res.redirect('/json'))
  app.listen(process.env.PORT, () =>
    console.log(`API listening on port ${process.env.PORT}!`)
  )
}
