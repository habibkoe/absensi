-- AlterTable
ALTER TABLE "ClassRooms" ADD COLUMN     "schoolId" INTEGER;

-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "schoolId" INTEGER;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "schoolId" INTEGER;

-- CreateTable
CREATE TABLE "Schools" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "studentTotal" INTEGER NOT NULL,
    "teacherTotal" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telp" TEXT NOT NULL,
    "posCode" TEXT NOT NULL,
    "province" INTEGER NOT NULL,
    "city" INTEGER NOT NULL,
    "district" INTEGER NOT NULL,
    "village" INTEGER NOT NULL,
    "nspn" TEXT NOT NULL,
    "refCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Schools_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schools_email_key" ON "Schools"("email");
