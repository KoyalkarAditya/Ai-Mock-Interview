"use server";
import db from "@/db";
export const GetUserInterviews = async (userEmail: string) => {
  const result = await db.mockInterview.findMany({
    where: {
      createdBy: userEmail,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!result) {
    return;
  }
  return result;
};
