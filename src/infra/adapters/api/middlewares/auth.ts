import * as jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, resolvedToken: any) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      res.setHeader('token', resolvedToken)
      next()
    }
  )
}

function signToken(id: string) {
  return jwt.sign({ id }, process.env.TOKEN_SECRET as string, {
    expiresIn: '1h',
  })
}
export { signToken, verifyToken }
