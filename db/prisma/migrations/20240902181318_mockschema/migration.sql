-- CreateTable
CREATE TABLE "MockInterview" (
    "id" TEXT NOT NULL,
    "jsonMockResp" TEXT NOT NULL,
    "jobPosition" TEXT NOT NULL,
    "jobDesc" TEXT NOT NULL,
    "jobExperience" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MockInterview_pkey" PRIMARY KEY ("id")
);
