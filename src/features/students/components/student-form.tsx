'use client';

import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Student } from '@/constants/mock-api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

const formSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length == 1, 'Student photo is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
  name: z.string().min(2, {
    message: 'Student name must be at least 2 characters.'
  }),
  father_name: z.string().min(2, {
    message: 'Father name must be at least 2 characters.'
  }),
  roll_number: z.string().min(5, {
    message: 'Roll number must be at least 5 characters.'
  }),
  cnic: z
    .string()
    .length(13, { message: 'CNIC must be exactly 13 digits.' })
    .regex(/^\d+$/, { message: 'CNIC must contain only numbers.' }),
  department: z.string().min(1, { message: 'Please select a department.' }),
  semester: z.string().min(1, { message: 'Please select a semester.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z
    .string()
    .min(11, { message: 'Phone number must be at least 11 digits.' }),
  address: z.string().min(10, {
    message: 'Address must be at least 10 characters.'
  })
});

export default function StudentForm({
  initialData,
  pageTitle
}: {
  initialData: Student | null;
  pageTitle: string;
}) {
  const defaultValues = {
    name: initialData?.name || '',
    father_name: initialData?.father_name || '',
    roll_number: initialData?.roll_number || '',
    cnic: initialData?.cnic || '',
    department: initialData?.department || '',
    semester: initialData?.semester?.toString() || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.address || ''
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    //eslint-disable-next-line
    console.log(values);
  }

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <div className='space-y-6'>
                  <FormItem className='w-full'>
                    <FormLabel>Student Photo</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFiles={1}
                        maxSize={MAX_FILE_SIZE}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter student name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='father_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Father Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter father name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='roll_number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roll Number</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter roll number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='cnic'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNIC</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter CNIC (13 digits)' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='department'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select department' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='computer_science'>
                          Computer Science
                        </SelectItem>
                        <SelectItem value='physics'>Physics</SelectItem>
                        <SelectItem value='chemistry'>Chemistry</SelectItem>
                        <SelectItem value='mathematics'>Mathematics</SelectItem>
                        <SelectItem value='english'>English</SelectItem>
                        <SelectItem value='economics'>Economics</SelectItem>
                        <SelectItem value='botany'>Botany</SelectItem>
                        <SelectItem value='zoology'>Zoology</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='semester'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select semester' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                          <SelectItem key={sem} value={sem.toString()}>
                            Semester {sem}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter email address' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter phone number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter complete address'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit'>
              {initialData ? 'Update Student' : 'Register Student'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
