import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: "movies" })
export class Movie {
  @PrimaryColumn({ name: "movieId", type: "integer" })
  movieId!: number;

  @Column({ name: "imdbId", type: "text" })
  imdbId!: string;

  @Column({ name: "title", type: "text" })
  title!: string;

  @Column({ name: "overview", type: "text", nullable: true })
  overview?: string;

  @Column({ name: "productionCompanies", type: "text", nullable: true })
  productionCompanies?: string;

  @Column({ name: "releaseDate", type: "text" })
  releaseDate!: string;

  @Column({ name: "budget", type: "integer", nullable: true })
  budget?: number;

  @Column({ name: "revenue", type: "integer", nullable: true })
  revenue?: number;

  @Column({ name: "runtime", type: "real", nullable: true })
  runtime?: number;

  @Column({ name: "language", type: "text" })
  language!: string;

  @Column({ name: "genres", type: "text" })
  genres!: string;

  @Column({ name: "status", type: "text", nullable: true })
  status?: string;
}
