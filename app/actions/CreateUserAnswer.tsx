"use server";
import db from "@/db";
interface UserAnswer {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  rating: number;
  userEmail: string;
  feedback: string;
}

export const CreateUserAnswer = async (
  interviewId: string,
  userAnswerData: UserAnswer
) => {
  const { question, correctAnswer, userEmail, rating, userAnswer, feedback } =
    userAnswerData;
  try {
    const response = await db.userAnswer.create({
      data: {
        interviewId,
        question,
        correctAnswer,
        userAnswer,
        userEmail,
        rating,
        feedback,
      },
    });
    if (!response) {
      return;
    }
    return response;
  } catch (e) {
    throw new Error("Error while Creating User Answer");
  }
};
