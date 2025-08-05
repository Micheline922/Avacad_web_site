"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';

const getTitleFromPathname = (pathname: string) => {
  if (pathname.includes('/dashboard')) return 'Tableau de bord';
  if (pathname.includes('/courses')) return 'Mes Cours';
  if (pathname.includes('/faq')) return 'FAQ IA';
  if (pathname.includes('/exam-tips')) return "Conseils d'examen";
  if (pathname.includes('/calculator')) return 'Calculatrice';
  if (pathname.includes('/pomodoro')) return 'Horloge Pomodoro';
  return "L'Avantage Académique de Milionne";
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
                
            </div>
        </header>
    );
};

export default Header;
