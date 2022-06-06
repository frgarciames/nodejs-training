import { Response } from 'express'

export default function unauthorizedException(res: Response) {
  res.status(401).send({ error: `Unauthorized` })
}
