"use client";
import { GetInterview } from "@/app/actions/GetInterview";
import { Button } from "@/components/ui/button";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";
interface Params {
  interviewid: string;
}

export interface InterviewProps {
  params: Params;
}
export interface Interview {
  id: string;
  jsonMockResp: string;
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
  createdBy: string;
  createdAt: Date;
}

export default function Interview({ params }: InterviewProps) {
  const [interview, setInterview] = useState<Interview>();
  const [webCaMEnabled, setWebCamEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchInterview = async () => {
      const response = await GetInterview(params.interviewid);
      setInterview(response);
      setLoading(false);
    };
    fetchInterview();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-10 flex flex-col ">
      <div className="font-bold text-2xl">Let's Get Started</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          {webCaMEnabled ? (
            <div className=" flex justify-center">
              <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                style={{
                  height: 500,
                  width: 500,
                }}
                mirrored={true}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-5 my-5 justify-center">
              <WebcamIcon className="full h-56 w-full p-10  border bg-secondary" />
              <Button className="w-full" onClick={() => setWebCamEnabled(true)}>
                Enable Web Cam and microphone
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col my-5 gap-5  ">
          <div className="border rounded-lg p-5 ">
            <div className="text-lg">
              <strong>Job Role/Job Position : </strong>
              {interview?.jobPosition}
            </div>
            <div className="text-lg">
              <strong>Job Description / Tech Stack : </strong>
              {interview?.jobDesc}
            </div>
            <div className="text-lg">
              <strong>Years of Experience : </strong>
              {interview?.jobExperience}
            </div>
          </div>
          <div className="border p-5 rounded-lg bg-yellow-100 border-yellow-300">
            <div className="flex gap-4">
              <Lightbulb />
              <strong>Information</strong>
            </div>
            <div>
              Enable Web Cam and Microphone to start your Ai Generated Mock
              Interview,It has 5 questions related to the job description which
              you need to answer and at last you get the report on the basis of
              your answers.
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Link href={`/dashboard/interview/${interview?.id}/start`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}
