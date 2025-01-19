'use client';
import { Student } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: 'photo_url',
    header: 'PHOTO',
    cell: ({ row }) => {
      return (
        <div className='relative h-10 w-10'>
          <Image
            src={row.getValue('photo_url')}
            alt={row.getValue('name')}
            fill
            className='rounded-full object-cover'
          />
        </div>
      );
    }
  },
  {
    accessorKey: 'roll_number',
    header: 'ROLL NO.'
  },
  {
    accessorKey: 'name',
    header: 'STUDENT NAME'
  },
  {
    accessorKey: 'father_name',
    header: 'FATHER NAME'
  },
  {
    accessorKey: 'department',
    header: 'DEPARTMENT'
  },
  {
    accessorKey: 'semester',
    header: 'SEMESTER'
  },
  // {
  //   accessorKey: 'cgpa',
  //   header: 'CGPA',
  //   cell: ({ row }) => {
  //     return <div>{row.getValue('cgpa').toFixed(2)}</div>;
  //   }
  // },
  {
    accessorKey: 'status',
    header: 'STATUS',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <div
          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold
          ${
            status === 'Active'
              ? 'bg-green-100 text-green-800'
              : status === 'Graduated'
              ? 'bg-blue-100 text-blue-800'
              : status === 'On Leave'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {status}
        </div>
      );
    }
  },
  {
    accessorKey: 'phone',
    header: 'PHONE'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
