-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "typeTeacher" TEXT NOT NULL,
    "typeOfStudy" TEXT NOT NULL,
    "categoryTeacher" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassRooms" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "studentTotal" INTEGER NOT NULL,
    "periodeStart" TIMESTAMP(3) NOT NULL,
    "periodeEnd" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassRooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MataPelajarans" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "MataPelajarans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnClassRooms" (
    "userId" INTEGER NOT NULL,
    "classRoomId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "UsersOnClassRooms_pkey" PRIMARY KEY ("userId","classRoomId")
);

-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "nis" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "parent" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "favoriteLearn" TEXT NOT NULL,
    "Hobby" TEXT NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentsOnClassRooms" (
    "studentId" INTEGER NOT NULL,
    "classRoomId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "StudentsOnClassRooms_pkey" PRIMARY KEY ("studentId","classRoomId")
);

-- CreateTable
CREATE TABLE "Absensi" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "classRoomId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "mapelId" INTEGER NOT NULL,
    "absensiType" TEXT NOT NULL,
    "absensiDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Absensi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Users_id_idx" ON "Users"("id");

-- CreateIndex
CREATE INDEX "Students_id_idx" ON "Students"("id");

-- CreateIndex
CREATE INDEX "Absensi_id_idx" ON "Absensi"("id");
