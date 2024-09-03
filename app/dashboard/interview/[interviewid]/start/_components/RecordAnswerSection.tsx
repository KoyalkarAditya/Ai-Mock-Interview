"use client";
import Webcam from "react-webcam";
import { Mic, Webcam as WebcamLogo } from "lucide-react";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { QuestionsAndAnswer } from "../page";
import { chatSession } from "@/utils/AiModel";

export const RecordAnswerSection = ({
  questionsAndAnswers,
  activeQuestionIndex,
}: {
  questionsAndAnswers: QuestionsAndAnswer[] | undefined;
  activeQuestionIndex: number;
}) => {
  const [userAnswer, setUserAnswer] = useState("");
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
      const feedbackPrompt = `Question:${
        questionsAndAnswers?.[activeQuestionIndex].question as string
      } Answer:${userAnswer}. Depending on the above question and answer give the rating for the answer and feedback as area of improvement in json format with 3 to 4 lines each as {rating : number,feedback:string}`;
      console.log(questionsAndAnswers);
      console.log(
        questionsAndAnswers?.[activeQuestionIndex].question as string
      );
      const result = await chatSession.sendMessage(feedbackPrompt);
      const response = result.response.text();
      const jsonResponse = JSON.parse(response);
      console.log(jsonResponse);
    } else {
      setUserAnswer("");
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
