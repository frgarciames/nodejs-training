import * as jwt from 'jsonwebtoken'

export default function generateAccessToken(email: string) {
  return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '3600s' })
}
