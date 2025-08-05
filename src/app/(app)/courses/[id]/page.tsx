
"use client";

import React from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { format, isPast, differenceInDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import ConclusionGenerator from '@/components/courses/conclusion-generator';
import AiTutor from '@/components/courses/ai-tutor';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const mockCourses = {
  cs101: {
    title: "Introduction à l'informatique",
    notes: [
        { title: 'Chapitre 1 : Fondamentaux de la programmation', content: "Ce chapitre introduit les concepts de base de la programmation tels que les variables (conteneurs pour stocker des données), les types de données (entiers, chaînes, booléens) et les opérateurs (arithmétiques, de comparaison). Nous utilisons Python pour sa syntaxe claire et sa facilité d'apprentissage." },
        { title: 'Chapitre 2 : Structures de contrôle', content: "Les structures de contrôle dirigent le flux d'exécution d'un programme. Nous couvrons les conditions (if-elif-else) pour prendre des décisions, et les boucles (for, while) pour répéter des actions. C'est essentiel pour créer une logique dynamique." },
        { title: 'Chapitre 3 : Fonctions', content: "Les fonctions sont des blocs de code réutilisables qui effectuent une tâche spécifique. Elles aident à organiser le code, à éviter la duplication et à le rendre plus lisible. Nous apprenons à définir des fonctions, à passer des arguments et à retourner des valeurs." },
        { title: 'Chapitre 4 : Structures de données de base', content: 'Introduction aux structures de données qui organisent et stockent les données. Nous explorons les listes (collections ordonnées et modifiables), les tuples (ordonnés et non modifiables) et les dictionnaires (paires clé-valeur non ordonnées).' },
    ],
    assignments: [
      { id: '1', title: 'Bonjour le monde en Python', dueDate: '2024-08-15', completed: true },
      { id: '2', title: 'Implémentation de FizzBuzz', dueDate: '2024-08-22', completed: true },
      { id: '3', title: 'Application de calculatrice simple', dueDate: '2024-09-01', completed: false },
    ],
  },
  ds202: {
    title: 'Structures de données et algorithmes',
     notes: [
        { title: 'Chapitre 1 : Introduction à la complexité algorithmique', content: 'Analyse de la performance des algorithmes avec la notation Big O. Comprendre comment mesurer l’efficacité en termes de temps et d’espace est fondamental pour choisir le bon algorithme pour un problème donné.' },
        { title: 'Chapitre 2 : Structures de données linéaires', content: 'Étude des listes chaînées (simples, doubles), des piles (LIFO - Last-In, First-Out) pour la gestion d’appels de fonction, et des files (FIFO - First-In, First-Out) pour la gestion de tâches en attente.' },
        { title: 'Chapitre 3 : Structures de données non linéaires', content: 'Exploration des arbres (binaires, de recherche binaire) pour des recherches efficaces et des données hiérarchiques, et des graphes pour modéliser des réseaux et des relations complexes.' },
        { title: 'Chapitre 4 : Algorithmes de tri et de recherche', content: 'Apprentissage et implémentation d’algorithmes de tri comme le tri à bulles, le tri par sélection, le tri par insertion, le tri fusion et le tri rapide. Introduction aux algorithmes de recherche comme la recherche binaire.' },
    ],
    assignments: [
      { id: '1', title: 'Implémenter une liste chaînée', dueDate: '2024-09-10', completed: true },
      { id: '2', title: 'Arbre de recherche binaire', dueDate: '2024-09-24', completed: false },
      { id: '3', title: 'Parcours de graphe (BFS, DFS)', dueDate: '2024-10-05', completed: false },
    ],
  },
  db303: {
    title: 'Systèmes de bases de données',
    notes: [
        { title: 'Chapitre 1 : Le modèle relationnel', content: 'Introduction au modèle de données le plus utilisé. Il organise les données en tables (relations) composées de lignes (tuples) et de colonnes (attributs). Les clés primaires et étrangères assurent l’intégrité des données.' },
        { title: 'Chapitre 2 : SQL (Structured Query Language)', content: 'Langage standard pour interagir avec les bases de données relationnelles. Apprentissage des commandes pour définir des structures (CREATE, ALTER), manipuler des données (INSERT, UPDATE, DELETE) et interroger des données (SELECT).' },
        { title: 'Chapitre 3 : Conception de bases de données et normalisation', content: 'Processus de conception d’un schéma de base de données efficace. La modélisation Entité-Association (diagrammes ER) et les formes normales (1NF, 2NF, 3NF) sont utilisées pour minimiser la redondance et améliorer l’intégrité des données.' },
        { title: 'Chapitre 4 : Transactions et concurrence', content: 'Une transaction est une séquence d’opérations exécutées comme une seule unité logique. Étude des propriétés ACID (Atomicité, Cohérence, Isolation, Durabilité) pour garantir la fiabilité des données, même avec plusieurs accès concurrents.' },
    ],
    assignments: [
      { id: '1', title: 'Diagramme ER pour une université', dueDate: '2024-08-30', completed: true },
      { id: '2', title: 'Pratique des requêtes SQL', dueDate: '2024-09-15', completed: true },
    ],
  },
  os404: {
    title: "Systèmes d'exploitation",
    notes: [
        { title: 'Chapitre 1 : Gestion des processus', content: 'Un processus est un programme en cours d’exécution. Le système d’exploitation gère la création, la destruction et la communication entre les processus. Étude des états des processus (nouveau, prêt, en cours, en attente, terminé).' },
        { title: 'Chapitre 2 : Ordonnancement du CPU', content: 'L’ordonnanceur choisit quel processus exécuter lorsque plusieurs sont prêts. Étude des algorithmes comme FCFS, SJF, Round Robin et à priorité pour optimiser l’utilisation du CPU et le temps de réponse.' },
        { title: 'Chapitre 3 : Gestion de la mémoire', content: 'Techniques pour allouer et gérer la mémoire principale de l’ordinateur. Apprentissage de la pagination, de la segmentation et de la mémoire virtuelle pour permettre l’exécution de processus plus grands que la mémoire physique disponible.' },
        { title: 'Chapitre 4 : Systèmes de fichiers et concurrence', content: 'Organisation des données sur le stockage secondaire (disques durs, SSD). Étude des structures de fichiers, des répertoires et des méthodes d’allocation d’espace. Introduction aux problèmes de concurrence comme les interblocages et les sections critiques.' },
    ],
    assignments: [
        { id: '1', title: "Simulation d'ordonnanceur de processus", dueDate: '2024-10-01', completed: false },
        { id: '2', title: "Implémentation d'un gestionnaire de mémoire", dueDate: '2024-10-15', completed: false },
    ],
  },
  elec101: {
    title: "Électricité : Principes et applications",
    notes: [
        { title: "Chapitre 1 : Lois fondamentales de l'électricité", content: "Ce chapitre couvre la loi d'Ohm (V=IR), qui relie la tension, le courant et la résistance. Il explore également les lois de Kirchhoff, qui sont essentielles pour analyser les circuits plus complexes en décrivant la conservation du courant aux nœuds et de la tension dans les boucles." },
        { title: "Chapitre 2 : Circuits en série et en parallèle", content: "Analyse des deux configurations de circuits de base. En série, les composants sont connectés bout à bout, et le courant est le même partout. En parallèle, les composants sont connectés sur des branches distinctes, et la tension est la même aux bornes de chaque branche. Comprendre ces configurations est crucial pour la conception de circuits." },
        { title: "Chapitre 3 : Magnétisme et électromagnétisme", content: "Introduction aux concepts de champs magnétiques, d'induction électromagnétique (loi de Faraday) et de la force de Lorentz. Ces principes expliquent le fonctionnement des moteurs, des générateurs et des transformateurs, qui sont au cœur de nombreux systèmes électriques." },
        { title: "Chapitre 4 : Courant alternatif (CA)", content: "Étude des circuits en courant alternatif, qui est la forme d'électricité utilisée pour la distribution d'énergie. Le chapitre aborde les notions de phase, d'impédance et de puissance en régime sinusoïdal, ainsi que l'utilisation des condensateurs et des inductances dans les circuits CA." }
    ],
    assignments: [
      { id: '1', title: "Analyse de circuits simples", dueDate: '2024-09-20', completed: false },
      { id: '2', title: "Laboratoire sur la loi d'Ohm", dueDate: '2024-10-04', completed: false },
    ],
  },
  droit201: {
    title: "Droit civil et législation sociale",
    notes: [
        { title: "Chapitre 1 : Introduction au droit civil", content: "Ce chapitre présente les sources du droit (loi, jurisprudence, doctrine) et les principes fondamentaux du droit civil. Il aborde la notion de personnalité juridique, les droits des personnes (droit au nom, à l'image) et l'organisation judiciaire." },
        { title: "Chapitre 2 : Le droit des contrats", content: "Étude de la formation, de l'exécution et de l'inexécution des contrats. Les conditions de validité d'un contrat (consentement, capacité, objet, cause) sont analysées, ainsi que les recours en cas de non-respect des obligations contractuelles (exécution forcée, résolution, dommages-intérêts)." },
        { title: "Chapitre 3 : La responsabilité civile", content: "Ce chapitre explore les conditions de la responsabilité civile, qui oblige une personne à réparer le dommage causé à autrui. Il distingue la responsabilité contractuelle (violation d'un contrat) de la responsabilité délictuelle (dommage causé en dehors de tout contrat) et analyse ses trois piliers : la faute, le dommage et le lien de causalité." },
        { title: "Chapitre 4 : Introduction à la législation sociale", content: "Présentation des concepts de base du droit du travail (contrat de travail, durée du travail, rupture du contrat) et de la sécurité sociale (assurance maladie, chômage, retraite). Ce chapitre donne un aperçu des droits et obligations des employeurs et des salariés." }
    ],
    assignments: [
      { id: '1', title: "Étude de cas sur un contrat", dueDate: '2024-09-25', completed: true },
      { id: '2', title: "Recherche sur la législation du travail", dueDate: '2024-10-10', completed: false },
    ],
  },
  eco101: {
    title: "Principes de l'économie générale",
    notes: [
        { title: "Chapitre 1 : Offre et demande", content: "Analyse du mécanisme de base qui détermine les prix et les quantités sur un marché. La loi de la demande (plus le prix est bas, plus la quantité demandée est élevée) et la loi de l'offre (plus le prix est haut, plus la quantité offerte est élevée) interagissent pour atteindre un prix d'équilibre." },
        { title: "Chapitre 2 : Microéconomie et macroéconomie", content: "Distinction entre les deux branches principales de l'économie. La microéconomie étudie les décisions des agents individuels (ménages, entreprises). La macroéconomie analyse l'économie dans son ensemble, en se concentrant sur des agrégats comme le PIB, le chômage et l'inflation." },
        { title: "Chapitre 3 : L'inflation et la politique monétaire", content: "L'inflation est la perte du pouvoir d'achat de la monnaie qui se traduit par une augmentation générale et durable des prix. Ce chapitre explore ses causes, ses conséquences et comment les banques centrales utilisent la politique monétaire (taux d'intérêt, etc.) pour la contrôler." },
        { title: "Chapitre 4 : Le commerce international et la croissance", content: "Explication des théories du commerce international (avantages absolus et comparatifs) qui justifient les échanges entre pays. Le chapitre aborde également les facteurs de la croissance économique à long terme, tels que le capital, le travail et le progrès technologique." }
    ],
    assignments: [
      { id: '1', title: "Analyse de l'offre et de la demande", dueDate: '2024-09-18', completed: true },
      { id: '2', title: "Dissertation sur la politique monétaire", dueDate: '2024-10-02', completed: false },
    ],
  },
  webdev301: {
    title: "Programmation Web",
    notes: [
        { title: "Chapitre 1 : HTML5 - La structure des pages web", content: "HTML (HyperText Markup Language) est le squelette de toute page web. Ce chapitre couvre les balises sémantiques (comme `<header>`, `<nav>`, `<main>`, `<footer>`) qui donnent du sens au contenu, ainsi que les éléments essentiels pour les formulaires, les images et les liens." },
        { title: "Chapitre 2 : CSS3 - Le style et la mise en page", content: "CSS (Cascading Style Sheets) est utilisé pour contrôler l'apparence visuelle des pages web. Nous explorons les sélecteurs, le modèle de boîte (box model), Flexbox et CSS Grid pour créer des mises en page complexes et réactives (responsive design) qui s'adaptent à toutes les tailles d'écran." },
        { title: "Chapitre 3 : JavaScript - L'interactivité côté client", content: "JavaScript rend les pages web dynamiques. Ce chapitre introduit la manipulation du DOM (Document Object Model) pour modifier le contenu de la page, la gestion des événements (clics, soumissions de formulaire) et les bases de la syntaxe du langage (variables, fonctions, boucles)." },
        { title: "Chapitre 4 : Interaction avec les API", content: "Apprenez à rendre votre site encore plus puissant en communiquant avec des serveurs distants via des API (Application Programming Interfaces). Nous utilisons la fonction `fetch` de JavaScript pour envoyer des requêtes HTTP (GET, POST) et traiter les réponses (souvent au format JSON) afin d'afficher des données externes." }
    ],
    assignments: [
      { id: '1', title: "Créer une page de portfolio statique", dueDate: '2024-09-22', completed: true },
      { id: '2', title: "Développer une application 'To-Do List' interactive", dueDate: '2024-10-12', completed: false },
    ],
  },
  archi401: {
    title: "Architecture de l'ordinateur",
    notes: [
        { title: "Chapitre 1 : Organisation et conception des systèmes informatiques", content: "Vue d'ensemble de la manière dont les composants matériels d'un ordinateur travaillent ensemble. Ce chapitre présente le modèle de Von Neumann, qui décrit les interactions entre l'unité centrale de traitement (CPU), la mémoire, le stockage et les périphériques d'entrée/sortie." },
        { title: "Chapitre 2 : Conception du processeur (CPU)", content: "Plongée au cœur du cerveau de l'ordinateur. Nous étudions le chemin de données (datapath), l'unité de contrôle, et l'ensemble d'instructions (ISA). Le chapitre couvre également le concept de pipelining, une technique qui permet au CPU d'exécuter plusieurs instructions simultanément pour améliorer les performances." },
        { title: "Chapitre 3 : Hiérarchie de la mémoire", content: "La mémoire n'est pas un bloc unique. Ce chapitre explore la hiérarchie des mémoires, des registres rapides mais petits du CPU aux caches (L1, L2, L3), à la RAM et au stockage de masse plus lents mais plus grands. Cette hiérarchie est conçue pour optimiser la vitesse d'accès aux données." },
        { title: "Chapitre 4 : Systèmes d'entrée/sortie (E/S) et parallélisme", content: "Étude de la manière dont l'ordinateur communique avec le monde extérieur via les périphériques (clavier, écran, réseau). Le chapitre introduit également les concepts de traitement parallèle, où plusieurs processeurs ou cœurs travaillent ensemble pour résoudre un problème plus rapidement (par exemple, les architectures multicœurs)." }
    ],
    assignments: [
      { id: '1', title: "Conception d'une unité arithmétique et logique (ALU)", dueDate: '2024-10-08', completed: false },
      { id: '2', title: "Simulation d'un pipeline de processeur", dueDate: '2024-10-22', completed: false },
    ],
  },
  fr_ing_info: {
    title: "Français pour l'ingénieur informaticien",
    notes: [
      { title: "Chapitre 1 : Communication professionnelle écrite", content: "Maîtriser la rédaction d'e-mails, de comptes rendus et de documentation professionnelle. L'accent est mis sur la clarté, la concision et l'adaptation au destinataire." },
      { title: "Chapitre 2 : Rédaction de rapports techniques", content: "Apprendre à structurer et rédiger des rapports techniques clairs et rigoureux, incluant des sections comme l'introduction, la méthodologie, les résultats et la conclusion." },
      { title: "Chapitre 3 : Présentations orales efficaces", content: "Développer des compétences pour présenter un projet technique de manière convaincante : structurer son discours, concevoir des supports visuels pertinents et gérer le temps de parole." },
      { title: "Chapitre 4 : Vocabulaire de l'informatique en français", content: "Enrichir son lexique avec les termes techniques normalisés en français pour décrire des concepts, des technologies et des processus informatiques." }
    ],
    assignments: [
      { id: '1', title: "Rédaction d'un e-mail professionnel", dueDate: '2024-11-05', completed: false },
      { id: '2', title: "Préparation d'un rapport d'incident", dueDate: '2024-11-19', completed: false },
      { id: '3', title: "Présentation d'un projet technique", dueDate: '2024-12-03', completed: false },
    ],
  },
  en_ing_info: {
    title: "Anglais pour l'ingénieur informaticien",
    notes: [
      { title: "Chapter 1: Technical Vocabulary and IT Jargon", content: "Building a strong vocabulary for technical discussions, including common acronyms, hardware/software terms, and industry-specific jargon." },
      { title: "Chapter 2: Writing Technical Documentation", content: "Learning to write clear and concise technical documents such as API documentation, user manuals, and tutorials for an international audience." },
      { title: "Chapter 3: Participating in Technical Meetings", content: "Developing skills for effective communication in meetings, including expressing opinions, asking for clarification, and presenting technical updates." },
      { title: "Chapter 4: Reading and Understanding Research Papers", content: "Strategies for reading, understanding, and summarizing academic and technical papers in the field of computer science." }
    ],
    assignments: [
      { id: '1', title: "Write a technical blog post", dueDate: '2024-11-10', completed: false },
      { id: '2', title: "Prepare a presentation on a new technology", dueDate: '2024-11-24', completed: false },
      { id: '3', title: "Summarize a technical article", dueDate: '2024-12-08', completed: false },
    ],
  },
  math_ing_info: {
    title: "Mathématiques pour l'ingénieur informaticien",
    notes: [
      { title: "Chapitre 1 : Logique et théorie des ensembles", content: "Fondements de la logique propositionnelle et des prédicats, raisonnement par récurrence, et théorie des ensembles. Essentiel pour l'algorithmique et les bases de données." },
      { title: "Chapitre 2 : Algèbre linéaire", content: "Étude des espaces vectoriels, des matrices, des déterminants et des transformations linéaires. Crucial pour l'infographie, l'apprentissage automatique et la cryptographie." },
      { title: "Chapitre 3 : Probabilités et statistiques", content: "Introduction aux probabilités discrètes et continues, aux variables aléatoires et aux tests d'hypothèses. Utilisé en intelligence artificielle, en analyse de données et en théorie de l'information." },
      { title: "Chapitre 4 : Graphes et algorithmes de graphes", content: "Théorie des graphes, représentation, parcours (BFS, DFS), et algorithmes fondamentaux comme Dijkstra et Kruskal. Au cœur des réseaux, de la logistique et de la modélisation." }
    ],
    assignments: [
      { id: '1', title: "Résolution de problèmes de logique", dueDate: '2024-11-12', completed: false },
      { id: '2', title: "Exercices sur les matrices", dueDate: '2024-11-26', completed: false },
      { id: '3', title: "Analyse statistique d'un jeu de données", dueDate: '2024-12-10', completed: false },
    ],
  },
};

type Assignment = { id: string; title: string; dueDate: string; completed: boolean; };
type Chapter = { title: string; content: string };

const DueDateBadge = ({ dueDate }: { dueDate: string }) => {
    const date = new Date(dueDate);
    const now = new Date();
    const daysUntil = differenceInDays(date, now);
    const isOverdue = isPast(date) && daysUntil < 0;

    if (isOverdue) {
        return <Badge variant="destructive">En retard</Badge>
    }
    if (daysUntil <= 3) {
        return <Badge variant="destructive" className="bg-amber-500 hover:bg-amber-600 text-white">À rendre dans {daysUntil+1} jour(s)</Badge>
    }
    return <Badge variant="secondary">À rendre le {format(date, 'd MMM', { locale: fr })}</Badge>
}

export default function CourseDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const courseId = params.id as keyof typeof mockCourses;
  const course = mockCourses[courseId] || { title: 'Cours non trouvé', notes: [], assignments: [] };
  
  const tab = searchParams.get('tab');
  const defaultTab = tab === 'tutor' || tab === 'conclusion' ? tab : 'notes';

  const fullCourseContentForAI = Array.isArray(course.notes) ? course.notes.map(c => `Chapitre: ${c.title}\nContenu: ${c.content}`).join('\n\n') : '';


  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl">{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="assignments">Devoirs</TabsTrigger>
            <TabsTrigger value="tutor">Tuteur IA</TabsTrigger>
            <TabsTrigger value="conclusion">Conclusion IA</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notes" className="mt-4">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Notes de cours</CardTitle>
                    <CardDescription>Développez les chapitres pour voir le contenu du cours.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-96 pr-4">
                       <Accordion type="single" collapsible className="w-full">
                        {Array.isArray(course.notes) && course.notes.map((chapter, index) => (
                          <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="font-headline text-lg hover:no-underline">{chapter.title}</AccordionTrigger>
                            <AccordionContent>
                              <p className="text-muted-foreground whitespace-pre-wrap">{chapter.content}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </ScrollArea>
                </CardContent>
             </Card>
          </TabsContent>
          
          <TabsContent value="assignments" className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Devoirs &amp; Échéances</CardTitle>
                    <CardDescription>Gardez une trace de vos devoirs.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {course.assignments.map((assignment: Assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 rounded-md bg-background hover:bg-secondary transition-colors">
                        <div className="flex items-center space-x-3">
                            <Checkbox id={`assign-${assignment.id}`} defaultChecked={assignment.completed} />
                            <label
                                htmlFor={`assign-${assignment.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {assignment.title}
                            </label>
                        </div>
                        <DueDateBadge dueDate={assignment.dueDate} />
                    </div>
                    ))}
                </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tutor" className="mt-4">
            <AiTutor courseContext={fullCourseContentForAI} />
          </TabsContent>

          <TabsContent value="conclusion" className="mt-4">
             <ConclusionGenerator courseName={course.title} initialContent={fullCourseContentForAI} />
          </TabsContent>

        </Tabs>
      </CardContent>
    </Card>
  );
}

    