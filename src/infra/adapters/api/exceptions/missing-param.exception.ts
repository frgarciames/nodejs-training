import { Response } from 'express'

export default function (res: Response, param: string) {
  res.status(400).send({
    error: `Missing param: ${param}`,
  })
}
