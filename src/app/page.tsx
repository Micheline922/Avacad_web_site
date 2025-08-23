
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, BrainCircuit, BookOpen, Lightbulb, LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';

const Logo = () => (
    <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
        <span className="font-headline text-2xl font-bold text-primary">Avacad</span>
    </div>
);

const features = [
  {
    icon: FileText,
    title: 'Synthèse Intelligente',
    description: "Gagnez du temps en obtenant des résumés et des mots-clés de vos documents de cours grâce à l'IA.",
  },
  {
    icon: BrainCircuit,
    title: 'Zone de Révision IA',
    description: "Préparez-vous efficacement avec des outils de révision, y compris des conseils d'examen.",
  },
  {
    icon: BookOpen,
    title: 'Gestion de Cours',
    description: 'Suivez vos devoirs, vos notes et vos progrès dans tous vos cours, le tout au même endroit.',
  },
   {
    icon: Lightbulb,
    title: 'FAQ par IA',
    description: "Ne restez plus bloqué. Obtenez des explications claires sur des concepts complexes de la part de votre tuteur IA.",
  },
];

const featuredCourses = [
    {
        title: "Introduction à l'informatique",
        description: "Les bases de la programmation et de la pensée algorithmique.",
    },
    {
        title: "Principes de l'économie générale",
        description: "Comprendre l'offre, la demande et les politiques monétaires.",
    },
    {
        title: "Droit civil et législation sociale",
        description: "Une introduction aux contrats et à la responsabilité civile.",
    },
    {
        title: "Programmation Web",
        description: "Créez des sites web modernes avec HTML, CSS et JavaScript.",
    },
];

const LoginForm = () => {
    const { login } = useAuth();
    const { toast } = useToast();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: 'Connexion réussie',
            description: 'Bienvenue sur Avacad! Redirection en cours...',
        });
        login();
    };

    return (
        <form onSubmit={handleLogin}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Nom
                    </Label>
                    <Input id="name" defaultValue="John Doe" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                        Email
                    </Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                        Mot de passe
                    </Label>
                    <Input id="password" type="password" defaultValue="********" className="col-span-3" />
                </div>
            </div>
            <div className="flex justify-end">
                <Button type="submit">
                    Se connecter
                </Button>
            </div>
        </form>
    )
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
            <Link href="/">
                <Logo />
            </Link>
          <nav className="flex items-center gap-4">
             <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        Se connecter <LogIn className="ml-2" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Connexion</DialogTitle>
                    <DialogDescription>
                        Entrez vos identifiants pour accéder à votre tableau de bord.
                    </DialogDescription>
                    </DialogHeader>
                    <LoginForm />
                </DialogContent>
            </Dialog>
          </nav>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="py-20 text-center bg-gradient-to-b from-primary/5 to-transparent">
            <div className="container">
                <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary">
                    Libérez Votre Potentiel Académique
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Un outil innovant conçu pour stimuler votre réussite scolaire. Il vous accompagne dans vos révisions, vous aide à organiser vos idées, et simplifie l’accès aux ressources essentielles pour apprendre efficacement.
                </p>
                 <Button size="lg" className="mt-8" asChild>
                    <Link href="/login">
                        Commencer Maintenant
                    </Link>
                </Button>
            </div>
        </section>

        <section id="features" className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl font-bold">Fonctionnalités Clés</h2>
              <p className="text-muted-foreground mt-2">Des outils conçus pour votre réussite.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="courses-preview" className="py-20 bg-muted/50">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold">Découvrez un aperçu de nos cours</h2>
                    <p className="text-muted-foreground mt-2">Des sujets variés pour élargir vos connaissances.</p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {featuredCourses.map((course) => (
                        <Card key={course.title}>
                            <CardHeader>
                                <CardTitle className="font-headline text-xl">{course.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{course.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Button asChild variant="outline">
                        <Link href="/courses">
                            Voir tous les cours <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>

        <section className="py-20">
           <div className="container max-w-3xl mx-auto">
             <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2"><Lightbulb />Citation du jour</CardTitle>
                </CardHeader>
                <CardContent>
                    <blockquote className="text-xl italic">
                        "La meilleure façon de prédire l'avenir, c'est de l'inventer."
                    </blockquote>
                    <p className="text-right mt-2 opacity-80">- Alan Kay</p>
                </CardContent>
            </Card>
           </div>
        </section>
      </main>

      <footer className="py-6 border-t">
        <div className="container text-center text-muted-foreground space-y-1">
          <p>&copy; {new Date().getFullYear()} Avacad. Tous droits réservés.</p>
          <p>Créé avec ❤️ par Micheline</p>
        </div>
      </footer>
    </div>
  );
}
