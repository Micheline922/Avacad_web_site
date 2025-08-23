"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarProvider
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  LogOut,
  GraduationCap,
  Calculator,
  Home
} from 'lucide-react';
import Header from './header';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { logout } = useAuth();

  const menuItems = [
    { href: '/', label: 'Accueil', icon: Home },
    { href: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { href: '/courses', label: 'Cours', icon: BookOpen },
    { href: '/exam-tips', label: "Conseils d'examen", icon: GraduationCap },
    { href: '/faq', label: 'FAQ IA', icon: HelpCircle },
    { href: '/calculator', label: 'Calculatrice', icon: Calculator },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <Link href="/" className="flex items-center gap-2 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              <h1 className="font-headline text-xl font-bold text-primary group-data-[collapsible=icon]:hidden">Avacad</h1>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={{ children: item.label }}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={logout}>
              <LogOut size={16} />
              <span className="group-data-[collapsible=icon]:hidden">Déconnexion</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-background">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
