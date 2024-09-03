"use client";
import { GetUserInterviews } from "@/app/actions/GetUserInterviews";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { InterviewItemCard } from "./InterviewItemCard";
interface MockInterview {
  id: string;
  jsonMockResp: string;
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
  createdBy: string;
  createdAt: Date;
}
export const InterviewList = () => {
  const [prevInterviews, setPrevInterviews] = useState<MockInterview[]>();
  const { user } = useUser();
  useEffect(() => {
    const fetchPrevInterviews = async () => {
      const response = await GetUserInterviews(
        user?.primaryEmailAddress?.emailAddress as string
      );
      setPrevInterviews(response);
    };
    fetchPrevInterviews();
  }, []);
  return (
    <div className="my-5">
      <div className=" font-medium text-xl">Previous Mock Interviews</div>
      <div className="grid mt-2 grid-cols-2 gap-5 md:grid-cols-3">
        {prevInterviews?.map((interview, index) => (
          <InterviewItemCard key={index} interview={interview} />
        ))}
      </div>
    </div>
  );
};
