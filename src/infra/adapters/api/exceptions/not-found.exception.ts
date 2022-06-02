import { Response } from 'express'

export default function notFoundException(res: Response, entity: string) {
  res.status(404).send({ error: `${entity} not found` })
}
