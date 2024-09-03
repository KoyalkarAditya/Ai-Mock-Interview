"use server";
import db from "@/db";
export const GetUserAnswers = async (interviewId: string) => {
  const response = await db.userAnswer.findMany({
    where: {
      interviewId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  console.log(response);
  if (!response) {
    throw new Error("Error while querying");
  }

  return response;
};
