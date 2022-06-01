import { loadControllers, scopePerRequest } from 'awilix-express'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as compression from 'compression'
import { asClass, createContainer } from 'awilix'
import { UserRepository } from '../typeorm/repositories/user.repository'

export const initApi = async () => {
  const app = express()
  const container = createContainer().register({
    userRepository: asClass(UserRepository).singleton(),
  })

  app.use(compression())
  app.use(bodyParser.json())
  app.use(scopePerRequest(container))
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
  app.use(loadControllers('controllers/*.controller.ts', { cwd: __dirname }))
  app.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}!`))
}
