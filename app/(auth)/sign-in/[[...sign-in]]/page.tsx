import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className=" h-screen flex flex-col items-center justify-center gap-10">
      <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
        Welcome to AI-MockInterview
      </h1>
      <SignIn />;
    </div>
  );
}
