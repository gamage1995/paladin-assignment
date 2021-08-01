import { MethodResponse, ResponseStatusCode, RegisterParams, LoginParams, UpdateTokenParams, TokenVerifyParams } from '../types/common'
import User from '../models/userModel'
import { getHashedPassword, hashedMatchesPlain } from '../utilities/managePasswords'
import { generateAccessToken } from '../utilities/manageWebTokens'

export class AuthController {

  public static async register(userInfo: RegisterParams): Promise<MethodResponse> {
    try {
      let userExists = await User.exists({ email: userInfo.email })
      if (userExists) {
        return new MethodResponse(ResponseStatusCode.BadRequest, 'The user already exists')
      }
      let hashedPassword = await getHashedPassword(userInfo.password)
      const newUser = new User({
        email: userInfo.email,
        password: hashedPassword
      })
      await newUser.save();
      const accessToken = generateAccessToken(userInfo.email);
      return new MethodResponse(ResponseStatusCode.Okay, 'okay', { accessToken })
    } catch (error) {
      return new MethodResponse(ResponseStatusCode.InternalError, error.message)
    }
  }

  public static async login(userInfo: LoginParams): Promise<MethodResponse> {
    try {
      let recordFromDB = await User.findOne({ email: userInfo.email })
      if (!recordFromDB) {
        return new MethodResponse(ResponseStatusCode.BadRequest, 'User not found')
      }
      let passwordsMatch = await hashedMatchesPlain(userInfo.password, recordFromDB.password)
      if (!passwordsMatch) {
        return new MethodResponse(ResponseStatusCode.BadRequest, 'Incorrect password');
      }
      const accessToken = generateAccessToken(userInfo.email);
      return new MethodResponse(ResponseStatusCode.Okay, 'okay', { accessToken });
    } catch (error) {
      return new MethodResponse(ResponseStatusCode.InternalError, error.message)
    }
  }

  public static async addUserRefreshToken(tokenInfo: UpdateTokenParams) {
    try {
      const filter = { email: tokenInfo.email }
      const update = { $addToSet: { tokens: tokenInfo.token } }
      await User.findOneAndUpdate(filter, update)
    } catch (error) {
      console.log('Failed to save the refresh token')
    }
  }

  public static async validTokenForUser(tokenInfo: TokenVerifyParams) {
    const user = await User.findOne({ email: tokenInfo.email })
    if (!user) {
      return false;
    }
    if (user.tokens.includes(tokenInfo.token)) {
      return true
    }
    return false;
  }

  public static async removeTokenFromUser(tokenInfo : TokenVerifyParams){
    const filter = { email: tokenInfo.email }
    const update = { $pull: { tokens: tokenInfo.token } }
    await User.findOneAndUpdate(filter, update)
  }

}