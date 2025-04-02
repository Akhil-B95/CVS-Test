import { DataSource } from "typeorm";
import { Movie } from "./entities/Movie";
import { Rating } from "./entities/Rating";
import path from "path";

export const MoviesDataSource = new DataSource({
  type: "sqlite",
  database: path.resolve(__dirname, "../db", "movies.db"),
  entities: [Movie],
  synchronize: false,
  logging: false
});

export const RatingsDataSource = new DataSource({
  type: "sqlite",
  database: path.resolve(__dirname, "../db", "ratings.db"),
  entities: [Rating],
  synchronize: false,
  logging: false
});
