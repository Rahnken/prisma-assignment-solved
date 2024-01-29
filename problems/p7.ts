import { prisma } from "./prisma";

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
  const userAvgScore = await prisma.starRating.aggregate({
    _avg: {
      score: true,
    },
    where: {
      userId: userId,
    },
  });

  return userAvgScore._avg.score;
};
