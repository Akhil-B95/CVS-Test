import { Router } from "express";
import { MovieController } from "../controllers/MovieController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();
const movieController = new MovieController();

router.get("/", asyncHandler(movieController.listMovies.bind(movieController)));
router.get("/details/:id", asyncHandler(movieController.movieDetails.bind(movieController)));
router.get("/year/:year", asyncHandler(movieController.moviesByYear.bind(movieController)));
router.get("/genre/:genre", asyncHandler(movieController.moviesByGenre.bind(movieController)));

export default router;
