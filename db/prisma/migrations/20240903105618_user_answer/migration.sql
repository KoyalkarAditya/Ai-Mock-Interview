-- CreateTable
CREATE TABLE "UserAnswer" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "userAnswer" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "userEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "MockInterview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
