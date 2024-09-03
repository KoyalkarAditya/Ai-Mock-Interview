import { Lightbulb, Volume2 } from "lucide-react";
import { QuestionsAndAnswer } from "../page";

export const QuestionSection = ({
  questionsAndAnswers,
  activeQuestionIndex,
}: {
  questionsAndAnswers: QuestionsAndAnswer[] | undefined;
  activeQuestionIndex: number;
}) => {
  const textToSpeech = (text: string) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("sorry your browser does not allow text to speech");
    }
  };
  return (
    <div className="my-10 p-5 border rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-4  gap-5">
        {questionsAndAnswers?.map((qna, index) => (
          <div
            className={` bg-secondary text-xs text-center md:text-sm  cursor-pointer  rounded-full p-2 ${
              activeQuestionIndex == index && "bg-[#3d3afd] text-white"
            }`}
            key={index}
          >
            Question #{index + 1}
          </div>
        ))}
      </div>
      <div className="my-5 text-md md:text-lg">
        {questionsAndAnswers?.[activeQuestionIndex].question}
      </div>
      <Volume2
        className="cursor-pointer"
        onClick={() =>
          textToSpeech(
            questionsAndAnswers?.[activeQuestionIndex].question as string
          )
        }
      />
      <div className="border rounded-lg p-5 bg-blue-100 text-primary mt-16">
        <div className="flex gap-2 items-center ">
          <Lightbulb />
          <strong>Note:</strong>
        </div>
        <div className="text-sm my-2">
          Click on Record Answer when you want to answer the question. At the
          end you will get the feedback.
        </div>
      </div>
    </div>
  );
};
