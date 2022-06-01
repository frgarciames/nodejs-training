import { Request, Response } from "express"

export default function(validateFn: Function) {
  return (req: Request, res: Response, next: Function) => {
    const isValid = validateFn(req.body)
    if (!isValid) {
      return res.status(400).send({ error: error.details[0].message })
    }
    next()
  }
}