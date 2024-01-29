import { prisma } from "./prisma";

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {
  const youngUsers = await prisma.user.findMany({
    select: {
      id: true,
    },
    where: {
      age: {
        lt: n,
      },
    },
  });

  const deleteRatings = prisma.starRating.deleteMany({
    where: {
      userId: { in: youngUsers.map((id) => id.id) },
    },
  });
  const deleteUser = prisma.user.deleteMany({
    where: {
      age: {
        lt: n,
      },
    },
  });

  return await prisma.$transaction([deleteRatings, deleteUser]);
};
