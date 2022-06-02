import { Request, Response } from 'express'
import missingParamException from '../exceptions/missing-param.exception'
import validationException from '../exceptions/validation.exception'

export default function isValidBodyParamValidation(validateFn: Function, params: string[]) {
  return (req: Request, res: Response, next: Function) => {
    for (const param of params) {
      if (!req.body[param]) {
        return missingParamException(res, param)
      }
      const isValid = validateFn(req.body[param])
      if (!isValid) {
        return validationException(res, param)
      }
    }
    next()
  }
}
