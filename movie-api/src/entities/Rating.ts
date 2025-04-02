import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: "ratings" })
export class Rating {
  @PrimaryColumn({ name: "ratingId", type: "integer" })
  ratingId!: number;

  @Column({ name: "userId", type: "integer" })
  userId!: number;

  @Column({ name: "movieId", type: "integer" })
  movieId!: number;

  @Column({ name: "rating", type: "real" })
  rating!: number;

  @Column({ name: "timestamp", type: "integer" })
  timestamp!: number;
}
