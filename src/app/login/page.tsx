// Intentionally using (auth) group for login, but file path is simpler.
// This page is part of the user flow before entering the main app.
"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { LogIn, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate a short delay for a better user experience
    setTimeout(() => {
        toast({
            title: 'Connexion réussie',
            description: 'Bienvenue, Milionne!',
        });
        login();
    }, 500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <CardTitle className="font-headline text-3xl">L'Avantage Académique de Milionne</CardTitle>
          <CardDescription>Portail d'accès étudiant</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
            <p className="text-center text-muted-foreground">
                Cliquez sur le bouton ci-dessous pour accéder à votre tableau de bord.
            </p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin} disabled={isLoading} className="w-full" size="lg">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogIn className="mr-2 h-4 w-4" />
            )}
            {isLoading ? 'Connexion...' : 'Accéder au tableau de bord'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
