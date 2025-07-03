import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BrainCircuit, BookOpen, Lightbulb, LogIn } from 'lucide-react';

const Logo = () => (
    <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
        <span className="font-headline text-2xl font-bold text-primary">Milionne</span>
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
    description: "Préparez-vous efficacement avec des outils de révision, y compris des quiz interactifs et des conseils d'examen.",
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

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
            <Link href="/">
                <Logo />
            </Link>
          <nav className="flex items-center gap-4">
             <Link href="/dashboard" passHref legacyBehavior>
                <Button>
                    Tableau de Bord <LogIn className="ml-2" />
                </Button>
            </Link>
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
                    L'Avantage Académique de Milionne est votre assistant personnel alimenté par l'IA, conçu pour vous aider à exceller dans vos études.
                </p>
                 <Link href="/dashboard" passHref legacyBehavior>
                    <Button size="lg" className="mt-8">
                        Commencer Maintenant
                    </Button>
                </Link>
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

        <section className="py-20 bg-muted/50">
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
        <div className="container text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} L'Avantage Académique de Milionne. Tous droits réservés.</p>
          <a href="https://milionne.firebase.com" className="text-sm hover:underline">https://milionne.firebase.com</a>
        </div>
      </footer>
    </div>
  );
}
