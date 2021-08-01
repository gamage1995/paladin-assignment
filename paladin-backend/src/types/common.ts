export class MethodResponse {
  status: number;
  responseMessage: string;
  payload?: any;
  constructor(status: number, responseMessage: string, payload?: any) {
    this.status = status,
      this.responseMessage = responseMessage;
    this.payload = payload;
  };
}

export enum ResponseStatusCode {
  Okay = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  InternalError = 500
}

export enum Events {
  addNewRefreshToken = 'addNewRefreshToken'
}

export interface RegisterParams {
  email: string,
  password: string
}

export interface LoginParams {
  email: string,
  password: string
}

export interface UpdateTokenParams {
  email: string,
  token: string
}

export interface TokenVerifyParams {
  email: string,
  token: string
}

export interface JWTPayload {
  email: string,
  iat: number,
  exp: number
}

interface movieParams {
  name : string,
  rating : number
}

export interface AddMovieParams {
  email : string,
  movies : [movieParams]
}