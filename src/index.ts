import { startApplication } from './application'

startApplication()
  .then(() => console.log('Application started'))
  .catch((err) => console.log(err))
