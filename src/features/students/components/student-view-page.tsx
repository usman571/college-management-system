import { fakeStudents, Student } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import StudentForm from './student-form';

type TStudentViewPageProps = {
  studentId: string;
};

export default async function StudentViewPage({
  studentId
}: TStudentViewPageProps) {
  let student = null;
  let pageTitle = 'Create New Student';

  if (studentId !== 'new') {
    const data = await fakeStudents.getStudentById(Number(studentId));
    student = data.student as Student;
    if (!student) {
      notFound();
    }
    pageTitle = `Edit Student`;
  }

  return <StudentForm initialData={student} pageTitle={pageTitle} />;
}
