import * as bodyParser from 'body-parser'
import * as express from 'express'
import router from './controllers/user'

export const initApi = async () => {
  const app = express()
  app.use(bodyParser.json())
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
  app.use('/users', router)
  app.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}!`))
}
