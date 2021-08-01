import axios from 'axios'
import { SignInParams, JWTPayload, RegisterParams } from '../types/common'
import jwt from 'jsonwebtoken'

export const login = (params: SignInParams) => {
  return axios.post('/auth/login', { email: params.email, password: params.password })
}

export const register = (params: RegisterParams) => {
  return axios.post('/auth/register', { email: params.email, password: params.password })
}

export const getUserMovies = (token: string) => {
  let decodedToken = (jwt.decode(token) as JWTPayload)
  return axios.post('/movie/getMovies', { email: decodedToken.email },
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )
}

export const getNewToken = () => {
  return axios.post('/auth/refresh')
}

export const logout =() => {
  return axios.post('/auth/logout')
}