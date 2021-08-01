import { EventEmitter } from 'events';
import { UpdateTokenParams } from '../types/common'
import { AuthController } from '../controllers/authController'

export const emitter = new EventEmitter();

let handleNewRefreshToken = async (params: UpdateTokenParams) => {
  await AuthController.addUserRefreshToken({ email: params.email, token: params.token })
}

emitter.addListener('addNewRefreshToken', handleNewRefreshToken);