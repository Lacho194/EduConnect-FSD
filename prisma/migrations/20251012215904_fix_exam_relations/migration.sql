/*
  Warnings:

  - You are about to drop the column `issuedAt` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `grade` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feedback` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Question" DROP CONSTRAINT "Question_examId_fkey";

-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "issuedAt",
DROP COLUMN "url",
ADD COLUMN     "grade" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "issueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "feedback" TEXT NOT NULL,
ALTER COLUMN "score" SET DATA TYPE DOUBLE PRECISION;

-- DropTable
DROP TABLE "public"."Question";

-- CreateTable
CREATE TABLE "ExamQuestion" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "examId" INTEGER NOT NULL,

    CONSTRAINT "ExamQuestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExamQuestion" ADD CONSTRAINT "ExamQuestion_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
