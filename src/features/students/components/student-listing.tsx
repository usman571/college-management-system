import { Student } from '@/constants/data';
import { fakeStudents } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as StudentTable } from '@/components/ui/table/data-table';
import { columns } from './student-tables/columns';

type StudentListingPage = {};

export default async function StudentListingPage({}: StudentListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const categories = searchParamsCache.get('categories');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  const data = await fakeStudents.getStudents(filters);
  const totalStudents = data.total_students;
  const students: Student[] = data.students;

  return (
    <StudentTable
      columns={columns}
      data={students}
      totalItems={totalStudents}
    />
  );
}
