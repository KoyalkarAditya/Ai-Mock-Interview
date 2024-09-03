"use client";
import { useEffect, useState } from "react";
import { InterviewProps } from "../page";
import { GetUserAnswers } from "@/app/actions/GetUserAnswers";
interface UserAnswer {
  id: string;
  question: string;
  correctAnswer: string;
  userAnswer: string;
  interviewId: string;
  rating: number;
  feedback: string;
  userEmail: string;
  createdAt: Date;
}
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function FeedBack({ params }: InterviewProps) {
  const [feedbackList, setFeedbackList] = useState<UserAnswer[]>();
  const router = useRouter();
  useEffect(() => {
    const fetchList = async () => {
      const response = await GetUserAnswers(params.interviewid);
      setFeedbackList(response);
    };
    fetchList();
  }, []);

  return (
    <div className="p-10">
      <div className="text-3xl font-bold text-green-500">Congratulations</div>
      <div className="font-bold text-2xl">Here is your feedback</div>
      <div className="text-primary text-lg my-3">
        Your overall rating is <strong>5</strong>
      </div>
      <div className="text-sm text-gray-500">
        Find below the correct answer along with your answer for improvement
      </div>
      {feedbackList?.map((feedback, index) => (
        <Collapsible key={index} className="mt-7">
          <CollapsibleTrigger className=" flex gap-5 p-2 bg-secondary rounded-lg my-2 text-left">
            {feedback.question} <ChevronsUpDown />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="flex flex-col gap-2">
              <div className="flex text-orange-400 p-2 items-center gap-3 border rounded-lg">
                <strong>Rating :</strong> {feedback.rating}
              </div>
              <div className="flex text-red-500 p-2 items-center gap-3 border rounded-lg">
                <strong>Your Answer :</strong>
                <p>{feedback.userAnswer}</p>
              </div>
              <div className="flex text-green-500 p-2 items-center gap-3 border rounded-lg">
                <strong>Correct Answer :</strong>
                <p className="flex-1">{feedback.correctAnswer}</p>
              </div>
              <div className="flex text-blue-300 bg-primary p-2 items-center gap-3 border rounded-lg">
                <strong>FeedBack :</strong>
                <p className="flex-1">{feedback.feedback}</p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
      <Button onClick={() => router.replace("/dashboard")}>Go Home</Button>
    </div>
  );
}
