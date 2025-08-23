
import React from 'react';
import AppLayout from '@/components/layout/app-layout';
import { AuthGuard } from '@/components/auth/auth-guard';
import { CourseProvider } from '@/context/course-context';
import { PomodoroProvider } from '@/context/pomodoro-context';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <CourseProvider>
        <PomodoroProvider>
          <AppLayout>{children}</AppLayout>
        </PomodoroProvider>
      </CourseProvider>
    </AuthGuard>
  );
}
