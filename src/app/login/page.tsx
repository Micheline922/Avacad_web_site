"use client";

import React, { useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { login, isLoading: isAuthLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // We only want to run this once the auth state has been loaded.
    if (!isAuthLoading) {
      toast({
          title: 'Connexion réussie',
          description: 'Bienvenue sur Avacad! Redirection en cours...',
      });
      login();
    }
  }, [isAuthLoading, login, toast]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h1 className="font-headline text-2xl font-bold">Connexion en cours...</h1>
        <p className="text-muted-foreground">Vous allez être redirigé vers votre tableau de bord.</p>
    </div>
  );
}
