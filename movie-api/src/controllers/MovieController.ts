import { Request, Response } from "express";
import { MovieService } from "../services/MovieService";

export class MovieController {
  private movieService = new MovieService();

  async listMovies(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string, 10) || 1;
    const movies = await this.movieService.getAllMovies(page);
    res.json(movies);
  }

  async movieDetails(req: Request, res: Response): Promise<void> {
    const movieId = parseInt(req.params.id, 10);
    if (isNaN(movieId)) {
      res.status(400).json({ error: "Invalid movie id" });
      return;
    }
    const details = await this.movieService.getMovieDetails(movieId);
    if (!details) {
      res.status(404).json({ error: "Movie not found" });
      return;
    }
    res.json(details);
  }

  async moviesByYear(req: Request, res: Response): Promise<void> {
    const year = req.params.year;
    const page = parseInt(req.query.page as string, 10) || 1;
    const sort = ((req.query.sort as string) || "ASC").toUpperCase() as "ASC" | "DESC";
    const movies = await this.movieService.getMoviesByYear(year, page, sort);
    res.json(movies);
  }

  async moviesByGenre(req: Request, res: Response): Promise<void> {
    const genre = req.params.genre;
    const page = parseInt(req.query.page as string, 10) || 1;
    const movies = await this.movieService.getMoviesByGenre(genre, page);
    res.json(movies);
  }
}
