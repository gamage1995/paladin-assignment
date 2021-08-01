import { Router } from 'express';
import { MovieController } from '../controllers/movieController';
import { isAuthenticated } from '../utilities/manageWebTokens';

export const movieRouter: Router = Router();

movieRouter.post("/getMovies",
  async (req, res, next) => {
    await isAuthenticated(req, res, next)
  },
  async (request, response) => {
    let email = request.body.email;
    let controllerResponse = await MovieController.getUserMovies(email)
    response
      .status(controllerResponse.status)
      .send({
        responseMessage: controllerResponse.responseMessage,
        payload: controllerResponse.payload
      })
  })
