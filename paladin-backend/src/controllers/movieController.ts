import { MethodResponse, ResponseStatusCode, AddMovieParams } from '../types/common'
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

  public static async addUserMovies(params : AddMovieParams){
    try{
      const newUserMovie = new UserMovie({
        email : params.email,
        movies : params.movies
      })
      await newUserMovie.save()
      return new MethodResponse(ResponseStatusCode.Okay, 'okay')
    }catch (error) {
      return new MethodResponse(ResponseStatusCode.InternalError, error.message)
    }
  }
}