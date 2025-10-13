import jwt from "jsonwebtoken"
import 'dotenv/config'
import { JWTPayload } from "../types/global.types"

const secretKey = process.env.COOKIE_KEY ?? ''
const expiry = process.env.COOKIE_MAX_AGE ?? ''

export const generateAccessToken = (payload:JWTPayload)=>{
  return jwt.sign(payload,secretKey,{expiresIn:expiry as any})
}
