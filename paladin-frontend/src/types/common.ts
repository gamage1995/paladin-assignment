export interface SignInParams {
  email: string,
  password: string
}

export interface RegisterParams {
  email: string,
  password: string
}

export enum FormStates {
  Login = "Login",
  Register = "Register"
}

export interface JWTPayload {
  email: string,
  iat: number,
  exp: number
}

export interface MovieParams {
  name : string,
  rating : number
}