import * as jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { Auth } from '@/domain/entities'

function authenticate(req, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    req.auth = decoded
  } catch (err) {
    return res.status(401).send('Invalid Token')
  }
  return next()
}

function signToken(auth: Auth) {
  return jwt.sign(
    {
      id: auth.id,
      email: auth.email,
    },
    process.env.TOKEN_SECRET as string,
    {
      expiresIn: '1h',
    }
  )
}
export { signToken, authenticate }
