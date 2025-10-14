/*
  Warnings:

  - You are about to alter the column `score` on the `Result` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "correct" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Result" ALTER COLUMN "score" SET DATA TYPE INTEGER;
