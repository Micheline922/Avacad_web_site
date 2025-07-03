// Intentionally using (auth) group for login, but file path is simpler.
// This page is part of the user flow before entering the main app.
"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { secureAccessWithGemini } from '@/ai/flows/secure-access';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Fingerprint, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSecureLogin = async () => {
    setIsLoading(true);
    try {
      // In a real app, you would capture actual biometric data.
      // Here, we use a placeholder data URI for a 1x1 transparent pixel to simulate.
      const placeholderBiometricData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
      
      const result = await secureAccessWithGemini({ biometricData: placeholderBiometricData });
      
      if (result.accessGranted) {
        toast({
          title: "Authentification réussie",
          description: "Bienvenue, Milionne!",
        });
        login();
      } else {
        toast({
          variant: "destructive",
          title: "Échec de l'authentification",
          description: result.reason || "Veuillez réessayer.",
        });
      }
    } catch (error) {
      console.error('Secure login error:', error);
      toast({
        variant: "destructive",
        title: "Une erreur est survenue",
        description: "Impossible de terminer l'authentification. Veuillez réessayer plus tard.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>
          <CardTitle className="font-headline text-3xl">L'Avantage Académique de Milionne</CardTitle>
          <CardDescription>Portail d'accès sécurisé</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
            <p className="text-center text-muted-foreground">
                Veuillez utiliser l'authentification biométrique pour accéder à votre tableau de bord académique.
            </p>
            <div className="relative h-32 w-32">
                <Image src="https://placehold.co/128x128/f1e6fc/be29ec" alt="Zone de scan biométrique" data-ai-hint="fingerprint scan" layout="fill" className="rounded-full" />
            </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSecureLogin} disabled={isLoading} className="w-full" size="lg">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Fingerprint className="mr-2 h-4 w-4" />
            )}
            {isLoading ? 'Authentification en cours...' : "S'authentifier avec Gemini Secure"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
