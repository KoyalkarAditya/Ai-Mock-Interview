"use server";
import db from "@/db";

export const CreateMockInterview = async (
  jobPosition: string,
  jobDesc: string,
  jobExperience: string,
  jsonMockResp: string,
  createdBy: string
) => {
  try {
    const interview = await db.mockInterview.create({
      data: {
        jobDesc,
        jobExperience,
        jobPosition,
        createdBy,
        jsonMockResp,
      },
    });
    return interview;
  } catch (e) {
    console.log(e);
    throw new Error("Error while creating interview");
  }
};
