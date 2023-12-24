-- CreateTable
CREATE TABLE "StudentsAndUserOnClassRooms" (
    "studentId" INTEGER NOT NULL,
    "classRoomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "periodeStart" TIMESTAMP(3) NOT NULL,
    "periodeEnd" TIMESTAMP(3) NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "StudentsAndUserOnClassRooms_pkey" PRIMARY KEY ("studentId","classRoomId")
);
