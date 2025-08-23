
import React from 'react';
import AppLayout from '@/components/layout/app-layout';
import { AuthGuard } from '@/components/auth/auth-guard';
import { CourseProvider } from '@/context/course-context';
import { ChronometreProvider } from '@/context/chronometre-context';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <CourseProvider>
        <ChronometreProvider>
          <AppLayout>{children}</AppLayout>
        </ChronometreProvider>
      </CourseProvider>
    </AuthGuard>
  );
}
