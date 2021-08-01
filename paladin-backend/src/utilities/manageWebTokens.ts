import jwt from 'jsonwebtoken';
import { ResponseStatusCode, JWTPayload } from '../types/common'
import { Request, Response, NextFunction } from 'express';
import { AuthController } from '../controllers/authController';

export const generateRefreshToken = (email: string) => {
  if (!process.env.REFRESH_SECRET) {
    throw new Error('enviroment variable undefined : REFRESH_SECRET')
  }
  const refreshToken = jwt.sign({ email }, process.env.REFRESH_SECRET, { expiresIn: '2d' })
  return refreshToken
}

export const generateAccessToken = (email: string) => {
  if (!process.env.ACCESS_SECRET) {
    throw new Error('enviroment variable undefined : ACCESS_SECRET')
  }
  const accessToken = jwt.sign({ email }, process.env.ACCESS_SECRET, { expiresIn: '15m' })
  return accessToken
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  if (!process.env.ACCESS_SECRET || !process.env.REFRESH_SECRET) {
    throw new Error('jwt token secrets undefined')
  }
  const header = req.headers["authorization"]
  if (header == undefined) {
    res.status(ResponseStatusCode.Unauthorized).send({responseMessage : 'Missing \'authorization\' property in header'})
  }
  const accessToken = String(header).split(' ')[1]

  try {
    jwt.verify(accessToken, process.env.ACCESS_SECRET)
    next()
    return
  } catch (_error) {
    console.log('Access Token Invalid')
  }
  const refreshToken = req.cookies.token;
  const isRefreshTokenValid = await validateRefreshToken(refreshToken, process.env.REFRESH_SECRET)
  if (isRefreshTokenValid) {
    res.status(ResponseStatusCode.Forbidden).send({responseMessage : 'Invalid access token'})
  } else {
    res.status(ResponseStatusCode.Unauthorized).send({responseMessage : 'Invalid refresh token'})
  }
}

export const handleRefresh = async (req: Request, res: Response) => {
  if (!process.env.REFRESH_SECRET) {
    throw new Error('enviroment variable undefined : REFRESH_SECRET')
  }
  const refreshToken = req.cookies.token;
  const isRefreshTokenValid = await validateRefreshToken(refreshToken, process.env.REFRESH_SECRET)
  if(isRefreshTokenValid){
    const accessToken = generateAccessToken((jwt.decode(refreshToken) as JWTPayload).email)
    res.status(ResponseStatusCode.Okay).send({responseMessage : 'okay', payload : { accessToken }})
  }else{
    res.status(ResponseStatusCode.Unauthorized).send({responseMessage : 'Invalid refresh token'})
  }
} 

export const handleLogout = async (req: Request, res: Response) => {
  try{
    const refreshToken = req.cookies.token;
    await AuthController.removeTokenFromUser({token : refreshToken, email : (jwt.decode(refreshToken) as JWTPayload).email})
    res.status(ResponseStatusCode.Okay).send({responseMessage : 'okay'})
  }catch(error){
    res.status(ResponseStatusCode.InternalError).send({responseMessage : error.message})
  }
}

export const validateRefreshToken = async (refreshToken: string, secret: string) => {
  try {
    jwt.verify(refreshToken, secret)
    const decodedToken = jwt.decode(refreshToken)
    const isValidTokenForUser = await AuthController.validTokenForUser({ email: (decodedToken as JWTPayload).email, token: refreshToken })
    if (isValidTokenForUser) {
      return true
    }
    return false
  } catch (_error) {
    return false
  }
}