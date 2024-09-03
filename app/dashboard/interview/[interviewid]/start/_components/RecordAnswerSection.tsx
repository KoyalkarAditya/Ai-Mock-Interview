"use client";
import Webcam from "react-webcam";
import { Mic, Webcam as WebcamLogo } from "lucide-react";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { useEffect, useState } from "react";

export const RecordAnswerSection = () => {
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
        <Button
          variant={"outline"}
          onClick={isRecording ? stopSpeechToText : startSpeechToText}
        >
          {isRecording ? (
            <h2 className="flex items-center">
              <Mic />
              <h2 className="text-red-600">Stop Recording</h2>
            </h2>
          ) : (
            "Start Recording"
          )}
        </Button>
      </div>
    </div>
  );
};
