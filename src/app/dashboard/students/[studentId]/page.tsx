import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import StudentViewPage from '@/features/students/components/student-view-page';

export const metadata = {
  title: 'Dashboard : Student View'
};

type PageProps = { params: { studentId: string } };

export default function Page({ params }: PageProps) {
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <StudentViewPage studentId={params.studentId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
