/*
  Warnings:

  - You are about to drop the `ConnectionTest` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "AttemptStatus" AS ENUM ('PENDING', 'PASSED', 'FAILED');

-- DropTable
DROP TABLE "ConnectionTest";

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "displayName" TEXT,
    "avatarUrl" TEXT,
    "totalXp" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "World" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "World_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Challenge" (
    "id" UUID NOT NULL,
    "worldId" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "instructions" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL DEFAULT 'EASY',
    "xpReward" INTEGER NOT NULL DEFAULT 10,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProgress" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "challengeId" UUID NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "xpEarned" INTEGER NOT NULL DEFAULT 0,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChallengeAttempt" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "challengeId" UUID NOT NULL,
    "status" "AttemptStatus" NOT NULL DEFAULT 'PENDING',
    "submission" TEXT,
    "errorMessage" TEXT,
    "executionTimeMs" INTEGER,
    "executedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChallengeAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "xpRequired" INTEGER,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAchievement" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "achievementId" UUID NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStreak" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "lastActivityAt" DATE,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserStreak_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "World_slug_key" ON "World"("slug");

-- CreateIndex
CREATE INDEX "World_isPublished_sortOrder_idx" ON "World"("isPublished", "sortOrder");

-- CreateIndex
CREATE INDEX "Challenge_worldId_orderIndex_idx" ON "Challenge"("worldId", "orderIndex");

-- CreateIndex
CREATE INDEX "Challenge_difficulty_idx" ON "Challenge"("difficulty");

-- CreateIndex
CREATE INDEX "Challenge_isPublished_idx" ON "Challenge"("isPublished");

-- CreateIndex
CREATE UNIQUE INDEX "Challenge_worldId_slug_key" ON "Challenge"("worldId", "slug");

-- CreateIndex
CREATE INDEX "UserProgress_userId_idx" ON "UserProgress"("userId");

-- CreateIndex
CREATE INDEX "UserProgress_challengeId_idx" ON "UserProgress"("challengeId");

-- CreateIndex
CREATE INDEX "UserProgress_isCompleted_idx" ON "UserProgress"("isCompleted");

-- CreateIndex
CREATE UNIQUE INDEX "UserProgress_userId_challengeId_key" ON "UserProgress"("userId", "challengeId");

-- CreateIndex
CREATE INDEX "ChallengeAttempt_userId_executedAt_idx" ON "ChallengeAttempt"("userId", "executedAt");

-- CreateIndex
CREATE INDEX "ChallengeAttempt_challengeId_idx" ON "ChallengeAttempt"("challengeId");

-- CreateIndex
CREATE INDEX "ChallengeAttempt_status_idx" ON "ChallengeAttempt"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_slug_key" ON "Achievement"("slug");

-- CreateIndex
CREATE INDEX "Achievement_isPublished_idx" ON "Achievement"("isPublished");

-- CreateIndex
CREATE INDEX "UserAchievement_userId_earnedAt_idx" ON "UserAchievement"("userId", "earnedAt");

-- CreateIndex
CREATE INDEX "UserAchievement_achievementId_idx" ON "UserAchievement"("achievementId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_userId_achievementId_key" ON "UserAchievement"("userId", "achievementId");

-- CreateIndex
CREATE UNIQUE INDEX "UserStreak_userId_key" ON "UserStreak"("userId");

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeAttempt" ADD CONSTRAINT "ChallengeAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeAttempt" ADD CONSTRAINT "ChallengeAttempt_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStreak" ADD CONSTRAINT "UserStreak_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
