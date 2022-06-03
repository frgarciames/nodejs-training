import * as _ from 'lodash'
import { Request, Response } from 'express'
import missingParamException from '../exceptions/missing-param.exception'
import validationException from '../exceptions/validation.exception'
import isEmptyValue from '@/domain/validations/is-empty-value'

const isNestedPath = (path: string) => path.includes('.')

export default function isValidBodyParamValidation(
  validateFn: Function,
  params: string[]
) {
  return (req: Request, res: Response, next: Function) => {
    for (const param of params) {
      let isValid: boolean
      switch (true) {
        case isNestedPath(param):
          const paramToValidate = _.get(req.body, param)
          if (isEmptyValue(paramToValidate))
            return missingParamException(res, param)
          isValid = validateFn(paramToValidate)
          break
        case isEmptyValue(req.body[param]):
          return missingParamException(res, param)
        default:
          isValid = validateFn(req.body[param])
          break
      }
      if (!isValid) {
        return validationException(res, param)
      }
    }
    next()
  }
}
