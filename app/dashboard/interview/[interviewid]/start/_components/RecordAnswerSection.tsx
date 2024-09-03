"use client";
import Webcam from "react-webcam";
import { Mic, Webcam as WebcamLogo } from "lucide-react";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { QuestionsAndAnswer } from "../page";
import { chatSession } from "@/utils/AiModel";
import { Interview } from "../../page";
import { CreateUserAnswer } from "@/app/actions/CreateUserAnswer";
import { useUser } from "@clerk/nextjs";

export const RecordAnswerSection = ({
  questionsAndAnswers,
  activeQuestionIndex,
  interview,
}: {
  questionsAndAnswers: QuestionsAndAnswer[] | undefined;
  activeQuestionIndex: number;
  interview: Interview;
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  const { user } = useUser();
  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  useEffect(() => {
    results.map((result) => {
      if (typeof result === "object" && result !== null) {
        setUserAnswer((prevAns) => prevAns + result.transcript);
      } else if (typeof result === "string") {
        setUserAnswer((prevAns) => prevAns + result);
      }
    });
  }, [results]);

  const saveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();

      if (userAnswer.length < 10) {
        toast("Error while recording answer, Answer is too small");
        return;
      }

      setLoading(true);
      const feedbackPrompt = `Question:${
        questionsAndAnswers?.[activeQuestionIndex].question as string
      } Answer:${userAnswer}. Depending on the above question and answer give the rating(1-5) for the answer and feedback as area of improvement in json format with 3 to 4 lines each as {rating : number,feedback:string}`;

      const result = await chatSession.sendMessage(feedbackPrompt);
      const response = result.response.text();
      const jsonResponse = JSON.parse(response);

      const userAnswerData = {
        userAnswer,
        rating: jsonResponse.rating,
        question: questionsAndAnswers?.[activeQuestionIndex].question as string,
        userEmail: user?.primaryEmailAddress?.emailAddress as string,
        correctAnswer: questionsAndAnswers?.[activeQuestionIndex]
          .answer as string,
        feedback: jsonResponse.feedback,
      };

      const res = await CreateUserAnswer(interview.id, userAnswerData);
      setLoading(false);
      if (res) {
        toast("User answer Recorded Successfully");
      }
    } else {
      startSpeechToText();
    }
  };

  return (
    <div className="border flex flex-col justify-center items-center my-16 p-5 gap-5">
      <div className="flex flex-col items-center   rounded-lg  ">
        <WebcamLogo height={300} width={"100%"} />
        <Webcam
          mirrored={true}
          style={{
            position: "absolute",
            height: 300,
            width: "100%",
            zIndex: 20,
          }}
        />
      </div>
      <div className=" border flex justify-center items-center">
        <Button variant={"outline"} onClick={saveUserAnswer}>
          {isRecording ? (
            <div className="flex items-center">
              <Mic />
              <div className="text-red-600">Stop Recording</div>
            </div>
          ) : (
            "Start Recording"
          )}
        </Button>
      </div>
    </div>
  );
};
