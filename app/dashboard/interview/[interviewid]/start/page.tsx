"use client";
import { GetInterview } from "@/app/actions/GetInterview";
import { useEffect, useState } from "react";
import { Interview, InterviewProps } from "../page";
import { QuestionSection } from "./_components/QuestionsSection";
import { RecordAnswerSection } from "./_components/RecordAnswerSection";

export interface QuestionsAndAnswer {
  question: string;
  answer: string;
}

export default function StartInterview({ params }: InterviewProps) {
  const [interview, setInterview] = useState<Interview>();
  const [loading, setLoading] = useState(true);
  const [questionsAndAnswers, setQuesAndAnswers] =
    useState<QuestionsAndAnswer[]>();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  useEffect(() => {
    const fetchInterview = async () => {
      const response = await GetInterview(params.interviewid);
      setInterview(response);
      setLoading(false);
      const json = JSON.parse(response?.jsonMockResp as string);
      setQuesAndAnswers(json);
    };
    fetchInterview();
  }, []);
  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionSection
          questionsAndAnswers={questionsAndAnswers}
          activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswerSection />
      </div>
    </div>
  );
}
