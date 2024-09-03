"use client";
import { CreateMockInterview } from "@/app/actions/CreateMockInterview";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/AiModel";
import { useUser } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const AddNewInterview = () => {
  const [open, setOpen] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const route = useRouter();
  const user = useUser();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const prompt = `JobPosition: ${jobPosition} jobDescription:${jobDescription} jobExperience:${jobExperience} based on the above info give 5 interview questions and answers in json format with schema [{question : string,answer:string}] no extra`;
    const result = await chatSession.sendMessage(prompt);
    setIsLoading(false);
    const MockResponse = result.response.text();
    setJsonResponse(JSON.parse(MockResponse));
    try {
      const interview = await CreateMockInterview(
        jobPosition,
        jobDescription,
        jobExperience,
        MockResponse,
        user.user?.primaryEmailAddress?.emailAddress as string
      );
      setOpen(false);
      route.push("/dashboard/interview/" + interview.id);
    } catch (e) {
      console.log(e);
      throw new Error("Error while creating interview");
    }
  };
  return (
    <div>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="mt-2 p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={open}>
        <DialogContent className=" max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us More about your interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <div>
                    Add Details about your job position/role , Job Description
                  </div>
                  <div className=" flex flex-col gap-3 mt-7 my-3">
                    <div className="text-black font-bold">
                      Job Role/Job Position
                    </div>
                    <Input
                      onChange={(e) => setJobPosition(e.target.value)}
                      placeholder="Ex: Full Stack Developer"
                      type="text"
                      required
                      className="font-bold"
                    />
                  </div>
                  <div className="flex flex-col gap-3 my-3">
                    <div className="text-black font-bold">
                      Job Description/Tech Stack
                    </div>
                    <Textarea
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Ex: javascript,react"
                      required
                      className="font-bold"
                    />
                  </div>
                  <div className=" flex flex-col gap-3 my-3">
                    <div className="text-black font-bold">
                      Years of Experience
                    </div>
                    <Input
                      onChange={(e) => setJobExperience(e.target.value)}
                      placeholder="Ex:2"
                      type="number"
                      required
                      max={50}
                      className="font-bold"
                    />
                  </div>
                </div>
                <div className=" flex gap-3 justify-end">
                  <Button
                    onClick={() => {
                      setOpen(false);
                      setIsLoading(false);
                    }}
                    variant={"ghost"}
                    className="border-2"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating from AI
                      </>
                    ) : (
                      <> Start Interview</>
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
