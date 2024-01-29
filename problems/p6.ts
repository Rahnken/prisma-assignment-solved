import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
  const ratedMovies = await prisma.starRating.findMany({
    select: {
      movieId: true,
    },
    where: {
      userId: userId,
    },
  });

  const movies = await prisma.movie.findMany({
    where: {
      id: { in: ratedMovies.map((id) => id.movieId) },
    },
    orderBy: [
      {
        id: "asc",
      },
    ],
  });
  return movies;
};
