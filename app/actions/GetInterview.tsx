"use server";
import db from "@/db";
export const GetInterview = async (interviewid: string) => {
  const interview = await db.mockInterview.findFirst({
    where: {
      id: interviewid,
    },
  });
  if (!interview) {
    return;
  }
  return interview;
};
