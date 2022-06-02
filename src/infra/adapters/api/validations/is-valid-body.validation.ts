import { Request, Response } from 'express'
import validationException from '../exceptions/validation.exception'

export default function isValidBodyValidation(validateFns: Function[]) {
  return (req: Request, res: Response, next: Function) => {
    for (const validateFn of validateFns) {
      const isValid = validateFn(req.body)
      if (!isValid) {
        return validationException(res, validateFn.name)
      }
    }
    next()
  }
}
