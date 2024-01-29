import { maxBy, minBy } from "remeda";
import { prisma } from "./prisma";
import { log } from "console";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  const grumpiest = await prisma.starRating.groupBy({
    by: ["userId"],
    _avg: {
      score: true,
    },
    orderBy: {
      _avg: {
        score: "asc",
      },
    },
    take: 1,
  });
  const [{ userId }] = grumpiest;
  return userId;
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
  const nicest = await prisma.starRating.groupBy({
    by: ["userId"],
    _avg: {
      score: true,
    },
    orderBy: {
      _avg: {
        score: "desc",
      },
    },
    take: 1,
  });

  const [{ userId }] = nicest;
  return userId;
};
