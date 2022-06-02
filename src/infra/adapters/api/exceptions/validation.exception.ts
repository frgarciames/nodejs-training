import { Response } from 'express'

export default function validationException(res: Response, param: string) {
  res.status(400).send({ error: `${param} not valid` })
}
