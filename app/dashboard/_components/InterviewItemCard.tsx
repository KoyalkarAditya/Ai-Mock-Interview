import { Button } from "@/components/ui/button";
import { MockInterview } from "@prisma/client";
import { useRouter } from "next/navigation";

export const InterviewItemCard = ({
  interview,
}: {
  interview: MockInterview;
}) => {
  const router = useRouter();
  return (
    <div className="border shadow-md rounded-lg p-3">
      <div className="font-bold text-primary">
        {interview?.jobPosition} Job position
      </div>
      <div className="text-sm text-grey">
        {interview?.jobExperience} Years of Experience
      </div>
      <div className="text-xs text-gray-400">
        Created At : {interview.createdAt.toString()}
      </div>
      <div className="flex gap-5 justify-between mt-2">
        <Button
          onClick={() =>
            router.push(`/dashboard/interview/${interview.id}/feedback`)
          }
          className="w-full"
          variant={"outline"}
        >
          FeedBack
        </Button>
        <Button
          onClick={() => {
            router.push(`/dashboard/interview/${interview.id}/start`);
          }}
          className="w-full"
        >
          Start
        </Button>
      </div>
    </div>
  );
};
