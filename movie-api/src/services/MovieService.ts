import { MoviesDataSource, RatingsDataSource } from "../ormconfig";
import { Movie } from "../entities/Movie";
import { Rating } from "../entities/Rating";
import { Like } from "typeorm";

export class MovieService {
  private ITEMS_PER_PAGE = 50;

  formatBudget(budget: number | null | undefined): string | null {
    if (budget == null) return null;
    return `$${Number(budget).toLocaleString()}`;
  }

  async getAllMovies(page: number = 1) {
    const skip = (page - 1) * this.ITEMS_PER_PAGE;
    const movieRepo = MoviesDataSource.getRepository(Movie);
    const movies = await movieRepo.find({
      select: ["movieId", "imdbId", "title", "genres", "releaseDate", "budget"],
      skip,
      take: this.ITEMS_PER_PAGE,
    });

    return movies.map(movie => ({
      movieId: movie.movieId,
      imdbId: movie.imdbId,
      title: movie.title,
      genres: movie.genres,
      releaseDate: movie.releaseDate,
      budget: this.formatBudget(movie.budget)
    }));
  }

  async getMovieDetails(movieId: number) {
    const movieRepo = MoviesDataSource.getRepository(Movie);
    const movie = await movieRepo.findOneBy({ movieId });
    if (!movie) return null;

    const ratingsRepo = RatingsDataSource.getRepository(Rating);
    const avgResult = await ratingsRepo
      .createQueryBuilder("rating")
      .select("AVG(rating.rating)", "averageRating")
      .where("rating.movieId = :movieId", { movieId })
      .getRawOne();

    return {
      movieId: movie.movieId,
      imdbId: movie.imdbId,
      title: movie.title,
      overview: movie.overview,
      productionCompanies: movie.productionCompanies,
      releaseDate: movie.releaseDate,
      budget: this.formatBudget(movie.budget),
      revenue: movie.revenue,
      runtime: movie.runtime,
      language: movie.language,
      genres: movie.genres,
      status: movie.status,
      averageRating: avgResult?.averageRating || null,
    };
  }

  async getMoviesByYear(year: string, page: number = 1, sort: "ASC" | "DESC" = "ASC") {
    const skip = (page - 1) * this.ITEMS_PER_PAGE;
    const movieRepo = MoviesDataSource.getRepository(Movie);
    const movies = await movieRepo.find({
      select: ["movieId", "imdbId", "title", "genres", "releaseDate", "budget"],
      where: { releaseDate: Like(`${year}-%-%`) },
      order: { releaseDate: sort },
      skip,
      take: this.ITEMS_PER_PAGE,
    });

    return movies.map(movie => ({
      movieId: movie.movieId,
      imdbId: movie.imdbId,
      title: movie.title,
      genres: movie.genres,
      releaseDate: movie.releaseDate,
      budget: this.formatBudget(movie.budget)
    }));
  }

  async getMoviesByGenre(genre: string, page: number = 1) {
    const skip = (page - 1) * this.ITEMS_PER_PAGE;
    const movieRepo = MoviesDataSource.getRepository(Movie);
    const movies = await movieRepo.find({
      select: ["movieId", "imdbId", "title", "genres", "releaseDate", "budget"],
      where: { genres: Like(`%${genre}%`) },
      skip,
      take: this.ITEMS_PER_PAGE,
    });

    return movies.map(movie => ({
      movieId: movie.movieId,
      imdbId: movie.imdbId,
      title: movie.title,
      genres: movie.genres,
      releaseDate: movie.releaseDate,
      budget: this.formatBudget(movie.budget)
    }));
  }
}
