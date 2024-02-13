-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Assignments" DROP CONSTRAINT "Assignments_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "Assignments" DROP CONSTRAINT "Assignments_facultyId_fkey";

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "Assignments_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "Assignments_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;
