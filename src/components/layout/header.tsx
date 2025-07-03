"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import LanguageSwitcher from './language-switcher';

const getTitleFromPathname = (pathname: string) => {
  if (pathname.includes('/dashboard')) return 'Dashboard';
  if (pathname.includes('/courses')) return 'My Courses';
  if (pathname.includes('/revision')) return 'Revision Zone';
  if (pathname.includes('/faq')) return 'AI FAQ';
  return "Milionne's Academic Edge";
}

const Header = () => {
    const pathname = usePathname();
    const title = getTitleFromPathname(pathname);
    
    return (
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
            <div className="flex items-center gap-4">
                <div className="md:hidden">
                    <SidebarTrigger />
                </div>
                <h1 className="font-headline text-2xl font-bold text-foreground">
                    {title}
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <LanguageSwitcher />
            </div>
        </header>
    );
};

export default Header;
