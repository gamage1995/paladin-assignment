import { MethodResponse, ResponseStatusCode } from '../types/common'
import UserMovie from '../models/movieModel'


export class MovieController {
  public static async getUserMovies(email: string): Promise<MethodResponse> {
    try {
      let userMovies = await UserMovie.findOne({ email })
      if (!userMovies) {
        return new MethodResponse(ResponseStatusCode.Okay, 'okay', { movies: [] })
      }
      else {
        return new MethodResponse(ResponseStatusCode.Okay, 'okay', { movies: userMovies.movies })
      }
    } catch (error) {
      return new MethodResponse(ResponseStatusCode.InternalError, error.message)
    }
  }
}