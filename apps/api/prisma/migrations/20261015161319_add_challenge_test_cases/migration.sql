-- CreateTable
CREATE TABLE "ChallengeTestCase" (
    "id" UUID NOT NULL,
    "challengeId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "input" JSONB NOT NULL,
    "expected" JSONB NOT NULL,
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChallengeTestCase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChallengeTestCase_challengeId_orderIndex_idx" ON "ChallengeTestCase"("challengeId", "orderIndex");

-- AddForeignKey
ALTER TABLE "ChallengeTestCase" ADD CONSTRAINT "ChallengeTestCase_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
