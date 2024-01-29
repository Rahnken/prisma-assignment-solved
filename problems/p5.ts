import { groupBy, map, reduce, sumBy } from "remeda";
import { prisma } from "./prisma";
import { StarRating } from "@prisma/client";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones

export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const groupedMovieRatingIds = await prisma.starRating.groupBy({
    by: ["movieId"],
    having: {
      score: {
        _avg: {
          gt: n,
        },
      },
    },
  });
  const ids: number[] = [];

  for (const { movieId } of groupedMovieRatingIds) {
    ids.push(movieId);
  }

  const movies = await prisma.movie.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  return movies;
};
