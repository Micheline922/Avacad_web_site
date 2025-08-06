
"use client";

import React, { useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { login, isLoading: isAuthLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // This page is now a gateway. If the user is already authenticated, send them to the dashboard.
    // Otherwise, send them to the landing page to use the new login modal.
    if (!isAuthLoading) {
        if (isAuthenticated) {
             router.push('/dashboard');
        } else {
             router.push('/');
        }
    }
  }, [isAuthLoading, isAuthenticated, router]);
  
   useEffect(() => {
    // This effect handles the case where the "Commencer" button is clicked.
    // It's a simple way to trigger the simulated login.
    if (!isAuthLoading && !isAuthenticated) {
        toast({
            title: 'Connexion réussie',
            description: 'Bienvenue sur Avacad! Redirection en cours...',
        });
        login();
    }
   }, [isAuthLoading, isAuthenticated, login, toast]);


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h1 className="font-headline text-2xl font-bold">Chargement...</h1>
        <p className="text-muted-foreground">Préparation de votre session.</p>
    </div>
  );
}
