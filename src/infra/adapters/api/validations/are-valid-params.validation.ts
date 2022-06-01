import { Request, Response } from 'express'
import missingParamException from '../exceptions/missing-param.exception'

export default function (params: string[]) {
  return (req: Request, res: Response, next: Function) => {
    for (const param of params) {
      if (!req.params[param]) {
        return missingParamException(res, param)
      }
    }
    next()
  }
}
