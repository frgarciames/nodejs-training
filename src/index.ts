import * as express from 'express'
import { initDB } from './infra/adapters/typeorm'

const app = express()

app.listen(3000, () => {
  console.log('initiating db')
  initDB()
  console.log('listening on port 3000')
})
