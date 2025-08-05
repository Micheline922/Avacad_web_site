
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
        { title: 'Chapitre 1 : Fondamentaux de la programmation', content: "Ce chapitre introduit les concepts de base de la programmation. Les variables sont comme des boîtes étiquetées pour stocker des informations (par exemple, `age = 25`). Chaque information a un type : entier (`int`), texte (`string`), ou vrai/faux (`booléen`). Les opérateurs nous permettent d'effectuer des calculs (`+`, `-`, `*`, `/`) ou des comparaisons (`==`, `!=`, `>`, `<`). Nous utilisons Python pour sa syntaxe simple, idéale pour les débutants." },
        { title: 'Chapitre 2 : Structures de contrôle', content: "Les structures de contrôle guident la logique de notre code. Les conditions (`if`, `elif`, `else`) permettent au programme de prendre des décisions. Par exemple : `if (age > 18) { print('Adulte'); }`. Les boucles (`for`, `while`) répètent une action plusieurs fois, comme parcourir une liste d'étudiants ou attendre une entrée utilisateur. Elles sont la clé pour automatiser des tâches répétitives." },
        { title: 'Chapitre 3 : Fonctions', content: "Les fonctions sont des blocs de code nommés et réutilisables qui accomplissent une tâche précise. Elles rendent le code plus propre, plus court et plus facile à maintenir. Une fonction peut prendre des entrées (arguments) et produire une sortie (valeur de retour). Par exemple, une fonction `calculerMoyenne(note1, note2)` prendrait deux notes et retournerait leur moyenne." },
        { title: 'Chapitre 4 : Structures de données de base', content: "Ce chapitre explore comment organiser les données. Les listes (`list`) sont des collections ordonnées et modifiables, parfaites pour stocker des séquences. Les tuples sont similaires mais non modifiables, garantissant que les données ne changent pas. Les dictionnaires (`dict`) stockent des paires clé-valeur (comme un annuaire téléphonique), permettant un accès ultra-rapide aux informations via une clé unique." },
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
        { title: 'Chapitre 1 : Introduction à la complexité algorithmique', content: "La notation 'Big O' est un outil essentiel pour mesurer l'efficacité d'un algorithme. Elle décrit comment le temps d'exécution ou l'espace mémoire requis par un algorithme augmente à mesure que la taille des données d'entrée augmente. Un algorithme en O(n) est linéaire, tandis qu'un algorithme en O(log n) est beaucoup plus rapide pour de grands volumes de données." },
        { title: 'Chapitre 2 : Structures de données linéaires', content: "Les listes chaînées relient les éléments via des pointeurs, ce qui permet des insertions et des suppressions efficaces au milieu de la liste. Les piles (LIFO - Dernier entré, premier sorti) sont utilisées pour des mécanismes comme le bouton 'Annuler' ou la gestion des appels de fonctions. Les files (FIFO - Premier entré, premier sorti) gèrent les tâches dans l'ordre de leur arrivée, comme une file d'attente pour une imprimante." },
        { title: 'Chapitre 3 : Structures de données non linéaires', content: "Les arbres organisent les données de manière hiérarchique. Les arbres de recherche binaires, par exemple, permettent des recherches très rapides (en temps O(log n)). Les graphes, composés de nœuds et d'arêtes, sont parfaits pour modéliser des réseaux complexes comme les réseaux sociaux, les cartes routières ou les dépendances de projets." },
        { title: 'Chapitre 4 : Algorithmes de tri et de recherche', content: "Le tri fusion et le tri rapide sont des algorithmes de tri efficaces (typiquement en O(n log n)) qui sont fondamentaux en informatique. La recherche binaire est un algorithme extrêmement rapide pour trouver un élément dans une liste déjà triée. Il fonctionne en divisant à plusieurs reprises l'intervalle de recherche en deux, éliminant la moitié des éléments restants à chaque étape." },
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
        { title: 'Chapitre 1 : Le modèle relationnel', content: "Le modèle relationnel, popularisé par SQL, structure les données dans des tables. Chaque table est une collection de lignes (enregistrements) et de colonnes (attributs). Les clés (primaires, étrangères) créent des liens entre les tables et garantissent l'intégrité et la cohérence des données, évitant ainsi les anomalies." },
        { title: 'Chapitre 2 : SQL (Structured Query Language)', content: "SQL est le langage universel pour communiquer avec les bases de données relationnelles. `SELECT` est utilisé pour lire les données, `INSERT` pour en ajouter, `UPDATE` pour les modifier et `DELETE` pour les supprimer. Les `JOIN` permettent de combiner des données provenant de plusieurs tables en une seule requête, ce qui est au cœur de la puissance de SQL." },
        { title: 'Chapitre 3 : Conception de bases de données et normalisation', content: "La normalisation est un processus de conception qui vise à réduire la redondance des données et à améliorer leur intégrité. Les formes normales (1NF, 2NF, 3NF) sont des règles qui guident la structure des tables. Une bonne conception évite les problèmes de mise à jour et assure que les données sont logiquement bien organisées." },
        { title: 'Chapitre 4 : Transactions et concurrence', content: "Les transactions garantissent que les opérations sur la base de données sont fiables. Les propriétés ACID (Atomicité, Cohérence, Isolation, Durabilité) assurent que soit toutes les opérations d'une transaction réussissent, soit aucune n'est appliquée. Cela empêche la base de données de se retrouver dans un état incohérent, même en cas de pannes ou d'accès multiples simultanés." },
    ],
    assignments: [
      { id: '1', title: 'Diagramme ER pour une université', dueDate: '2024-08-30', completed: true },
      { id: '2', title: 'Pratique des requêtes SQL', dueDate: '2024-09-15', completed: true },
    ],
  },
  os404: {
    title: "Systèmes d'exploitation",
    notes: [
        { title: 'Chapitre 1 : Gestion des processus', content: "Un processus est une instance d'un programme en cours d'exécution. Le système d'exploitation (SE) est responsable de l'allocation des ressources (CPU, mémoire) à chaque processus, de leur création à leur destruction. Il gère également la communication inter-processus, leur permettant de collaborer en toute sécurité." },
        { title: 'Chapitre 2 : Ordonnancement du CPU', content: "L'ordonnanceur du CPU est le composant du SE qui décide quel processus prêt doit obtenir l'accès au processeur. Des algorithmes comme le 'Round Robin' (tourniquet) donnent à chaque processus une petite tranche de temps, assurant une bonne réactivité du système. D'autres, comme SJF (Shortest Job First), optimisent le débit global." },
        { title: 'Chapitre 3 : Gestion de la mémoire', content: "La gestion de la mémoire est cruciale pour permettre à plusieurs programmes de s'exécuter en même temps. La mémoire virtuelle est une technique astucieuse où le SE utilise le disque dur pour simuler plus de RAM qu'il n'y en a physiquement. La pagination divise la mémoire en blocs de taille fixe pour simplifier l'allocation et éviter la fragmentation." },
        { title: 'Chapitre 4 : Systèmes de fichiers et concurrence', content: "Un système de fichiers organise les données sur un support de stockage (disque dur, SSD) sous forme de fichiers et de répertoires. Il gère les permissions d'accès et assure l'intégrité des données. La concurrence est un défi majeur : le SE doit utiliser des mécanismes comme les verrous (mutex) ou les sémaphores pour éviter que plusieurs processus n'interfèrent les uns avec les autres lors de l'accès à des ressources partagées, ce qui pourrait causer des erreurs ou des blocages." },
    ],
    assignments: [
        { id: '1', title: "Simulation d'ordonnanceur de processus", dueDate: '2024-10-01', completed: false },
        { id: '2', title: "Implémentation d'un gestionnaire de mémoire", dueDate: '2024-10-15', completed: false },
    ],
  },
  elec101: {
    title: "Électricité : Principes et applications",
    notes: [
        { title: "Chapitre 1 : Lois fondamentales de l'électricité", content: "La loi d'Ohm (V=IR) est la pierre angulaire de l'analyse des circuits. Elle stipule que la tension (V) est égale au courant (I) multiplié par la résistance (R). Les lois de Kirchhoff sont également essentielles : la loi des nœuds (la somme des courants entrant dans un nœud est nulle) et la loi des mailles (la somme des tensions dans une boucle est nulle) permettent de résoudre des circuits plus complexes." },
        { title: "Chapitre 2 : Circuits en série et en parallèle", content: "Dans un circuit en série, les composants sont connectés l'un après l'autre. Le courant est le même à travers tous les composants, et les résistances s'additionnent. Dans un circuit en parallèle, les composants sont sur des branches séparées. La tension est la même aux bornes de chaque branche, et l'inverse de la résistance totale est la somme des inverses de chaque résistance. La plupart des circuits domestiques sont câblés en parallèle." },
        { title: "Chapitre 3 : Magnétisme et électromagnétisme", content: "Un courant électrique génère un champ magnétique, et un champ magnétique variable induit un courant dans un conducteur (loi de Faraday). Cette interaction est la base des moteurs électriques (qui transforment l'énergie électrique en mouvement), des générateurs (qui font l'inverse) et des transformateurs (qui modifient les niveaux de tension et de courant)." },
        { title: "Chapitre 4 : Courant alternatif (CA)", content: "Le courant alternatif (CA), où le courant change de direction périodiquement, est utilisé pour transporter l'électricité sur de longues distances car il peut être facilement transformé. L'impédance est l'équivalent de la résistance en CA, mais elle inclut également les effets des condensateurs et des inductances, qui déphasent le courant et la tension et stockent de l'énergie." }
    ],
    assignments: [
      { id: '1', title: "Analyse de circuits simples", dueDate: '2024-09-20', completed: false },
      { id: '2', title: "Laboratoire sur la loi d'Ohm", dueDate: '2024-10-04', completed: false },
    ],
  },
  droit201: {
    title: "Droit civil et législation sociale",
    notes: [
        { title: "Chapitre 1 : Introduction au droit civil", content: "Le droit civil régit les rapports entre les personnes privées (physiques ou morales). Il définit ce qu'est une personne juridique, ses droits fondamentaux (droit à la vie privée, à la propriété) et ses obligations. Les sources du droit incluent la loi votée par le parlement, la jurisprudence (décisions des tribunaux) et la doctrine (analyses des juristes)." },
        { title: "Chapitre 2 : Le droit des contrats", content: "Un contrat est un accord de volontés destiné à créer des obligations. Pour être valide, il requiert le consentement libre et éclairé des parties, leur capacité juridique, un objet certain et une cause licite. En cas d'inexécution, la partie lésée peut demander l'exécution forcée, la résolution du contrat, ou des dommages-intérêts pour compenser le préjudice subi." },
        { title: "Chapitre 3 : La responsabilité civile", content: "La responsabilité civile vise à réparer un dommage causé à autrui. Pour l'engager, il faut prouver trois éléments : une faute (un acte ou une négligence), un dommage (matériel, moral ou corporel) et un lien de causalité direct entre la faute et le dommage. Elle peut être contractuelle (liée à un contrat) or délictuelle (en dehors de tout contrat)." },
        { title: "Chapitre 4 : Introduction à la législation sociale", content: "La législation sociale protège les individus dans leur vie professionnelle et personnelle. Le droit du travail encadre la relation entre employeur et salarié (contrat de travail, salaire, durée du travail, licenciement). Le droit de la sécurité sociale organise la solidarité nationale pour couvrir les risques sociaux : maladie, accident du travail, chômage, et retraite." }
    ],
    assignments: [
      { id: '1', title: "Étude de cas sur un contrat", dueDate: '2024-09-25', completed: true },
      { id: '2', title: "Recherche sur la législation du travail", dueDate: '2024-10-10', completed: false },
    ],
  },
  eco101: {
    title: "Principes de l'économie générale",
    notes: [
        { title: "Chapitre 1 : Offre et demande", content: "Le modèle de l'offre et de la demande est le concept central de l'économie de marché. La courbe de demande montre la quantité d'un bien que les consommateurs sont prêts à acheter à différents prix. La courbe d'offre montre la quantité que les producteurs sont prêts à vendre. Le point où ces deux courbes se croisent détermine le prix et la quantité d'équilibre du marché." },
        { title: "Chapitre 2 : Microéconomie et macroéconomie", content: "La microéconomie se concentre sur les décisions des agents économiques individuels : les ménages (consommation, épargne) et les entreprises (production, prix, investissement). La macroéconomie étudie l'économie dans sa globalité, en utilisant des indicateurs agrégés comme le Produit Intérieur Brut (PIB), le taux de chômage, le niveau général des prix (inflation) et la balance commerciale." },
        { title: "Chapitre 3 : L'inflation et la politique monétaire", content: "L'inflation est une augmentation durable et généralisée des prix, qui érode le pouvoir d'achat de la monnaie. Les banques centrales, comme la BCE, combattent l'inflation en utilisant la politique monétaire. Leur principal outil est le taux d'intérêt directeur : en l'augmentant, elles rendent le crédit plus cher, ce qui freine la consommation et l'investissement, et donc la hausse des prix." },
        { title: "Chapitre 4 : Le commerce international et la croissance", content: "Le commerce international permet aux pays de se spécialiser dans la production où ils ont un avantage comparatif (produire à un coût relatif plus faible), augmentant ainsi l'efficacité et la richesse mondiale. La croissance économique à long terme dépend de l'accumulation de capital (machines, infrastructures), de l'augmentation de la main-d'œuvre et, surtout, du progrès technologique." }
    ],
    assignments: [
      { id: '1', title: "Analyse de l'offre et de la demande", dueDate: '2024-09-18', completed: true },
      { id: '2', title: "Dissertation sur la politique monétaire", dueDate: '2024-10-02', completed: false },
    ],
  },
  webdev301: {
    title: "Programmation Web",
    notes: [
        { title: "Chapitre 1 : HTML5 - La structure des pages web", content: "HTML est le langage de balisage qui définit la structure sémantique d'une page web. Les balises comme `<header>`, `<main>`, `<article>` et `<footer>` ne servent pas qu'à la mise en page ; elles donnent un sens au contenu pour les navigateurs et les lecteurs d'écran, ce qui est crucial pour l'accessibilité et le référencement (SEO)." },
        { title: "Chapitre 2 : CSS3 - Le style et la mise en page", content: "CSS est utilisé pour styliser le HTML. Le 'responsive design' est une approche fondamentale qui vise à créer des pages qui s'affichent parfaitement sur tous les appareils (mobiles, tablettes, ordinateurs). Pour cela, on utilise des techniques modernes comme Flexbox (pour les alignements sur un axe) et CSS Grid (pour les mises en page complexes sur deux axes)." },
        { title: "Chapitre 3 : JavaScript - L'interactivité côté client", content: "JavaScript est le langage de programmation qui s'exécute dans le navigateur de l'utilisateur. Il permet de manipuler le DOM (la représentation en mémoire de la page HTML) pour créer, modifier ou supprimer des éléments dynamiquement. La gestion des événements permet de réagir aux actions de l'utilisateur, comme un clic de souris ou une saisie au clavier." },
        { title: "Chapitre 4 : Interaction avec les API", content: "Les API (Application Programming Interfaces) permettent à votre site web de communiquer avec des serveurs pour obtenir ou envoyer des données sans recharger la page. On utilise généralement l'objet `fetch` en JavaScript pour effectuer des requêtes HTTP asynchrones. Les données sont souvent échangées au format JSON (JavaScript Object Notation), un format texte léger et facile à manipuler." }
    ],
    assignments: [
      { id: '1', title: "Créer une page de portfolio statique", dueDate: '2024-09-22', completed: true },
      { id: '2', title: "Développer une application 'To-Do List' interactive", dueDate: '2024-10-12', completed: false },
    ],
  },
  archi401: {
    title: "Architecture de l'ordinateur",
    notes: [
        { title: "Chapitre 1 : Organisation et conception des systèmes informatiques", content: "Ce chapitre explore l'architecture de Von Neumann, le modèle fondamental de la plupart des ordinateurs modernes. Il se compose de quatre parties principales : l'unité centrale de traitement (CPU), la mémoire principale (RAM), les dispositifs d'entrée/sortie (clavier, écran) et le bus qui les relie. Nous étudions comment ces composants interagissent pour exécuter des instructions." },
        { title: "Chapitre 2 : Conception du processeur (CPU)", content: "Le CPU, ou processeur, est le cerveau de l'ordinateur. Il est composé d'une unité arithmétique et logique (ALU) qui effectue les calculs, d'une unité de contrôle qui orchestre les opérations, et de registres pour un stockage ultra-rapide. Le pipelining est une technique clé qui permet au CPU de traiter plusieurs instructions en parallèle, comme sur une chaîne de montage, ce qui augmente considérablement les performances." },
        { title: "Chapitre 3 : Hiérarchie de la mémoire", content: "L'accès à la mémoire est souvent un goulot d'étranglement. Pour y remédier, les ordinateurs utilisent une hiérarchie de mémoires. En haut, les registres rapides et petits du CPU. Ensuite, plusieurs niveaux de cache (L1, L2, L3), plus lents mais plus grands, qui stockent les données fréquemment utilisées. Enfin, la RAM et le stockage de masse (SSD/HDD). Ce système permet de garder les données les plus pertinentes au plus près du processeur." },
        { title: "Chapitre 4 : Systèmes d'entrée/sortie (E/S) et parallélisme", content: "Ce chapitre traite de la communication entre le CPU et les périphériques externes (disques, réseaux, etc.). Il aborde également le parallélisme, un concept fondamental dans l'informatique moderne. Les architectures multicœurs, avec plusieurs processeurs sur une même puce, et le traitement parallèle (utilisé par les cartes graphiques - GPU) permettent d'exécuter un grand nombre de calculs simultanément pour des tâches comme l'intelligence artificielle ou le calcul scientifique." }
    ],
    assignments: [
      { id: '1', title: "Conception d'une unité arithmétique et logique (ALU)", dueDate: '2024-10-08', completed: false },
      { id: '2', title: "Simulation d'un pipeline de processeur", dueDate: '2024-10-22', completed: false },
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
