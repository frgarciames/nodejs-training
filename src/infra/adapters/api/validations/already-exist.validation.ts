import { Response } from 'express'

export default function alreadyExistException(res: Response, [key, value]: string[]) {
  res.status(409).send({ error: `${value} already exist and ${key} must be unique` })
}
