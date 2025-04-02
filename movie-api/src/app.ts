import "reflect-metadata";
import express from "express";
import movieRoutes from "./routes/movieRoutes";
import { MoviesDataSource, RatingsDataSource } from "./ormconfig";

const app = express();
app.use(express.json());
app.use("/movies", movieRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await MoviesDataSource.initialize();
    console.log("Connected to movies database");
    await RatingsDataSource.initialize();
    console.log("Connected to ratings database");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (err) {
    console.error("Error during Data Source initialization", err);
  }
}

startServer();
