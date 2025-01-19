////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Define the shape of Student data
export type Student = {
  id: number;
  roll_number: string;
  photo_url: string;
  name: string;
  father_name: string;
  cnic: string;
  address: string;
  phone: string;
  email: string;
  department: string;
  semester: number;
  admission_date: string;
  last_updated: string;
  cgpa: number;
  status: 'Active' | 'Graduated' | 'On Leave' | 'Suspended';
};

// Mock student data store
export const fakeStudents = {
  records: [] as Student[],

  // Initialize with sample data
  initialize() {
    const sampleStudents: Student[] = [];
    function generateRandomStudentData(id: number): Student {
      const departments = [
        'Computer Science',
        'Physics',
        'Chemistry',
        'Mathematics',
        'English',
        'Economics',
        'Botany',
        'Zoology'
      ];

      const statuses: Array<Student['status']> = [
        'Active',
        'Graduated',
        'On Leave',
        'Suspended'
      ];

      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      return {
        id,
        roll_number: `${faker.number.int({
          min: 2020,
          max: 2024
        })}-${faker.number.int({ min: 1000, max: 9999 })}`,
        name: `${firstName} ${lastName}`,
        father_name: `${faker.person.firstName()} ${lastName}`,
        cnic: faker.number
          .int({ min: 1000000000000, max: 9999999999999 })
          .toString(),
        address: faker.location.streetAddress(true),
        phone: faker.phone.number(),
        email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        photo_url: `https://images.pexels.com/photos/4855451/pexels-photo-4855451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
        department: faker.helpers.arrayElement(departments),
        semester: faker.number.int({ min: 1, max: 8 }),
        admission_date: faker.date
          .between({
            from: '2020-01-01',
            to: '2024-12-31'
          })
          .toISOString(),
        last_updated: faker.date.recent().toISOString(),
        cgpa: parseFloat(faker.number.float({ min: 2.0, max: 4.0 }).toFixed(2)),
        status: faker.helpers.arrayElement(statuses)
      };
    }

    // Generate sample records
    for (let i = 1; i <= 50; i++) {
      sampleStudents.push(generateRandomStudentData(i));
    }

    this.records = sampleStudents;
  },

  // Get all students with optional department filtering and search
  async getAll({
    departments = [],
    search,
    status
  }: {
    departments?: string[];
    search?: string;
    status?: Student['status'];
  }) {
    let students = [...this.records];

    // Filter students based on selected departments
    if (departments.length > 0) {
      students = students.filter((student) =>
        departments.includes(student.department)
      );
    }

    // Filter by status if provided
    if (status) {
      students = students.filter((student) => student.status === status);
    }

    // Search functionality across multiple fields
    if (search) {
      students = matchSorter(students, search, {
        keys: ['name', 'roll_number', 'father_name', 'department', 'email']
      });
    }

    return students;
  },

  // Get paginated results with optional department filtering and search
  async getStudents({
    page = 1,
    limit = 10,
    departments,
    search,
    status
  }: {
    page?: number;
    limit?: number;
    departments?: string;
    search?: string;
    status?: Student['status'];
  }) {
    await delay(1000);
    const departmentsArray = departments ? departments.split('.') : [];
    const allStudents = await this.getAll({
      departments: departmentsArray,
      search,
      status
    });
    const totalStudents = allStudents.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedStudents = allStudents.slice(offset, offset + limit);

    // Return paginated response
    return {
      success: true,
      time: new Date().toISOString(),
      message: 'Student records retrieved successfully',
      total_students: totalStudents,
      offset,
      limit,
      students: paginatedStudents
    };
  },

  // Get a specific student by ID
  async getStudentById(id: number) {
    await delay(1000);

    const student = this.records.find((student) => student.id === id);

    if (!student) {
      return {
        success: false,
        message: `Student with ID ${id} not found`
      };
    }

    return {
      success: true,
      time: new Date().toISOString(),
      message: `Student with ID ${id} found`,
      student
    };
  }
};

// Initialize sample students
fakeStudents.initialize();
