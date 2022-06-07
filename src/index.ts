import { startApplication } from './application'

startApplication()
  .then(() => console.log('Application started'))
  .catch((err) => {
    console.error('Application failed to start', err)
    process.exit(1)
  })
