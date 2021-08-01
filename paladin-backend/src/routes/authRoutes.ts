import { Router } from 'express'
import {AuthController} from '../controllers/authController'
import { generateRefreshToken, handleLogout, handleRefresh } from '../utilities/manageWebTokens'
import {emitter} from '../utilities/manageEvents'
import {Events, ResponseStatusCode} from '../types/common'
export const authRouter: Router = Router();

authRouter.post("/register", async (request, response) => {
  let email = request.body.email;
  let password = request.body.password;
  let registerResponse = await AuthController.register({
    email,
    password,
  })
  if(registerResponse.status === ResponseStatusCode.Okay){
    const refreshToken = generateRefreshToken(email);
    response.cookie('token', refreshToken, {httpOnly : true})
    emitter.emit(Events.addNewRefreshToken, {email, token : refreshToken})
  }
  response
  .status(registerResponse.status)
  .send({
    responseMessage: registerResponse.responseMessage,
    payload: registerResponse.payload
  })
})

authRouter.post("/login", async (request, response) => {
  let email = request.body.email;
  let password = request.body.password;
  let loginResponse = await AuthController.login({
    email,
    password,
  })
  if(loginResponse.status === ResponseStatusCode.Okay){
    const refreshToken = generateRefreshToken(email);
    response.cookie('token', refreshToken, {httpOnly : true})
    emitter.emit(Events.addNewRefreshToken, {email, token : refreshToken})
  }
  response
  .status(loginResponse.status)
  .send({
    responseMessage: loginResponse.responseMessage,
    payload: loginResponse.payload
  })
})

authRouter.post("/refresh", async (request, response) => {
  await handleRefresh(request, response)
})

authRouter.post("/logout", async (request, response) => {
  await handleLogout(request, response)
})

