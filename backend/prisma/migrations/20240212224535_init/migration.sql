-- CreateTable
CREATE TABLE "Assignments" (
    "facultyId" INTEGER NOT NULL,
    "assignmentId" INTEGER NOT NULL,

    CONSTRAINT "Assignments_pkey" PRIMARY KEY ("facultyId","assignmentId")
);

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "Assignments_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "Assignments_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
