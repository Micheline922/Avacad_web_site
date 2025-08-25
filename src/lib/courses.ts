
export type Assignment = { id: string; title: string; dueDate: string; completed: boolean; };
export type Chapter = { title: string; content: string };

export type Course = {
  id: string;
  title: string;
  description: string;
  faculty: string;
  progress: number;
  notes: Chapter[];
  assignments: Assignment[];
  totalStudyTime: number; // in seconds
};

const courses: Course[] = [
  {
    id: 'cs101',
    title: "Introduction à l'informatique",
    description: "Fondamentaux de la programmation et des concepts informatiques.",
    faculty: "Informatique",
    progress: 0,
    totalStudyTime: 0,
    notes: [
        { title: 'Chapitre 1 : Fondamentaux de la programmation', content: "Ce chapitre introduit les concepts de base de la programmation. Les variables sont comme des boîtes étiquetées pour stocker des informations (par exemple, `age = 25`). Chaque information a un type : entier (`int`), texte (`string`), ou vrai/faux (`booléen`). Les opérateurs nous permettent d'effectuer des calculs (`+`, `-`, `*`, `/`) ou des comparaisons (`==`, `!=`, `>`, `<`). Nous utilisons Python pour sa syntaxe simple, idéale pour les débutants." },
        { title: 'Chapitre 2 : Structures de contrôle', content: "Les structures de contrôle guident la logique de notre code. Les conditions (`if`, `elif`, `else`) permettent au programme de prendre des décisions. Par exemple : `if (age > 18) { print('Adulte'); }`. Les boucles (`for`, `while`) répètent une action plusieurs fois, comme parcourir une liste d'étudiants ou attendre une entrée utilisateur. Elles sont la clé pour automatiser des tâches répétitives." },
        { title: 'Chapitre 3 : Fonctions', content: "Les fonctions sont des blocs de code nommés et réutilisables qui accomplissent une tâche précise. Elles rendent le code plus propre, plus court et plus facile à maintenir. Une fonction peut prendre des entrées (arguments) et produire une sortie (valeur de retour). Par exemple, une fonction `calculerMoyenne(note1, note2)` prendrait deux notes et retournerait leur moyenne." },
        { title: 'Chapitre 4 : Structures de données de base', content: "Ce chapitre explore comment organiser les données. Les listes (`list`) sont des collections ordonnées et modifiables, parfaites pour stocker des séquences. Les tuples sont similaires mais non modifiables, garantissant que les données ne changent pas. Les dictionnaires (`dict`) stockent des paires clé-valeur (comme un annuaire téléphonique), permettant un accès ultra-rapide aux informations via une clé unique." },
    ],
    assignments: [],
  },
  {
    id: 'ds202',
    title: 'Structures de données et algorithmes',
    description: "Étude approfondie des structures de données et des techniques algorithmiques.",
    faculty: "Informatique",
    progress: 0,
    totalStudyTime: 0,
     notes: [
        { title: 'Chapitre 1 : Introduction à la complexité algorithmique', content: "La notation 'Big O' est un outil essentiel pour mesurer l'efficacité d'un algorithme. Elle décrit comment le temps d'exécution ou l'espace mémoire requis par un algorithme augmente à mesure que la taille des données d'entrée augmente. Un algorithme en O(n) est linéaire, tandis qu'un algorithme en O(log n) est beaucoup plus rapide pour de grands volumes de données." },
        { title: 'Chapitre 2 : Structures de données linéaires', content: "Les listes chaînées relient les éléments via des pointeurs, ce qui permet des insertions et des suppressions efficaces au milieu de la liste. Les piles (LIFO - Dernier entré, premier sorti) sont utilisées pour des mécanismes comme le bouton 'Annuler' ou la gestion des appels de fonctions. Les files (FIFO - Premier entré, premier sorti) gèrent les tâches dans l'ordre de leur arrivée, comme une file d'attente pour une imprimante." },
        { title: 'Chapitre 3 : Structures de données non linéaires', content: "Les arbres organisent les données de manière hiérarchique. Les arbres de recherche binaires, par exemple, permettent des recherches très rapides (en temps O(log n)). Les graphes, composés de nœuds et d'arêtes, sont parfaits pour modéliser des réseaux complexes comme les réseaux sociaux, les cartes routières ou les dépendances de projets." },
        { title: 'Chapitre 4 : Algorithmes de tri et de recherche', content: "Le tri fusion et le tri rapide sont des algorithmes de tri efficaces (typiquement en O(n log n)) qui sont fondamentaux en informatique. La recherche binaire est un algorithme extrêmement rapide pour trouver un élément dans une liste déjà triée. Il fonctionne en divisant à plusieurs reprises l'intervalle de recherche en deux, éliminant la moitié des éléments restants à chaque étape." },
    ],
    assignments: [],
  },
   {
    id: 'droit201',
    title: "Droit civil et législation sociale",
    description: "Introduction aux concepts du droit civil et de la législation sociale.",
    faculty: "Droit",
    progress: 0,
    totalStudyTime: 0,
    notes: [
        { title: "Chapitre 1 : Introduction au droit civil", content: "Le droit civil régit les rapports entre les personnes privées (physiques ou morales). Il définit ce qu'est une personne juridique, ses droits fondamentaux (droit à la vie privée, à la propriété) et ses obligations. Les sources du droit incluent la loi votée par le parlement, la jurisprudence (décisions des tribunaux) et la doctrine (analyses des juristes)." },
        { title: "Chapitre 2 : Le droit des contrats", content: "Un contrat est un accord de volontés destiné à créer des obligations. Pour être valide, il requiert le consentement libre et éclairé des parties, leur capacité juridique, un objet certain et une cause licite. En cas d'inexécution, la partie lésée peut demander l'exécution forcée, la résolution du contrat, ou des dommages-intérêts pour compenser le préjudice subi." },
        { title: "Chapitre 3 : La responsabilité civile", content: "La responsabilité civile vise à réparer un dommage causé à autrui. Pour l'engager, il faut prouver trois éléments : une faute (un acte ou une négligence), un dommage (matériel, moral ou corporel) et un lien de causalité direct entre la faute et le dommage. Elle peut être contractuelle (liée à un contrat) or délictuelle (en dehors de tout contrat)." },
        { title: "Chapitre 4 : Introduction à la législation sociale", content: "La législation sociale protège les individus dans leur vie professionnelle et personnelle. Le droit du travail encadre la relation entre employeur et salarié (contrat de travail, salaire, durée du travail, licenciement). Le droit de la sécurité sociale organise la solidarité nationale pour couvrir les risques sociaux : maladie, accident du travail, chômage, et retraite." }
    ],
    assignments: [],
  },
  {
    id: 'droit-penal-101',
    title: "Introduction au Droit Pénal",
    description: "Principes fondamentaux du droit pénal, infractions et sanctions.",
    faculty: "Droit",
    progress: 0,
    totalStudyTime: 0,
    notes: [
        { title: "Chapitre 1 : Principes du Droit Pénal", content: "Ce chapitre aborde les principes de légalité des délits et des peines, la non-rétroactivité de la loi pénale plus sévère, et la présomption d'innocence. Ces principes garantissent les libertés individuelles face au pouvoir de punir de l'État." },
        { title: "Chapitre 2 : L'infraction", content: "Une infraction est composée de trois éléments : l'élément légal (le texte de loi qui la prévoit), l'élément matériel (l'acte commis) et l'élément moral (l'intention coupable ou la négligence). Nous analyserons la distinction entre crimes, délits et contraventions." },
        { title: "Chapitre 3 : La responsabilité pénale", content: "Qui peut être tenu pour responsable d'une infraction ? Ce chapitre explore les causes d'irresponsabilité ou d'atténuation de la responsabilité, comme la légitime défense, l'état de nécessité, le trouble mental, ou la contrainte." }
    ],
    assignments: [],
  },
  {
    id: 'env101',
    title: "Sciences de l'Environnement",
    description: "Introduction aux écosystèmes, à la biodiversité et aux défis environnementaux.",
    faculty: "Environnement",
    progress: 0,
    totalStudyTime: 0,
    notes: [
        { title: "Chapitre 1 : Les Écosystèmes", content: "Un écosystème est un ensemble dynamique formé par une communauté d'êtres vivants (biocénose) et leur milieu naturel (biotope). Ce chapitre explore les flux d'énergie et les cycles de la matière (carbone, azote) qui régissent ces systèmes." },
        { title: "Chapitre 2 : La Biodiversité", content: "La biodiversité désigne la variété des formes de vie sur Terre. Nous étudierons ses différentes échelles (génétique, spécifique, écosystémique) et son importance pour la stabilité des écosystèmes et le bien-être humain. Les causes de l'érosion de la biodiversité seront également analysées." },
        { title: "Chapitre 3 : Enjeux environnementaux contemporains", content: "Ce chapitre dresse un panorama des grands défis actuels : changement climatique, pollution (air, eau, sols), gestion des déchets et épuisement des ressources naturelles. Des pistes de solutions et les principes du développement durable seront discutés." }
    ],
    assignments: [],
  },
  {
    id: 'archi101',
    title: "Histoire de l'Architecture",
    description: "Panorama des grands courants architecturaux de l'Antiquité à nos jours.",
    faculty: "Architecture",
    progress: 0,
    totalStudyTime: 0,
    notes: [
        { title: "Chapitre 1 : Architecture de l'Antiquité", content: "Ce chapitre explore les ordres architecturaux grecs (dorique, ionique, corinthien) et les innovations romaines comme l'arc en plein cintre, la voûte et le dôme, qui ont permis la construction d'édifices monumentaux tels que le Colisée ou le Panthéon." },
        { title: "Chapitre 2 : Du Roman au Gothique", content: "L'architecture médiévale se caractérise par l'art roman (murs épais, voûtes en berceau) puis par l'art gothique, avec ses innovations structurelles (croisée d'ogives, arcs-boutants) permettant d'élever des cathédrales baignées de lumière." },
        { title: "Chapitre 3 : Le Mouvement Moderne", content: "Le 20ème siècle voit une rupture avec la tradition. Le Mouvement Moderne, porté par des architectes comme Le Corbusier ou Mies van der Rohe, prône la fonctionnalité, la rationalité, l'utilisation de nouveaux matériaux (béton armé, acier, verre) et l'abandon de l'ornementation superflue." }
    ],
    assignments: [],
  },
  {
    id: 'agro101',
    title: "Principes d'Agronomie",
    description: "Introduction à la science des sols, à la culture des plantes et aux systèmes agricoles.",
    faculty: "Agronomie",
    progress: 0,
    totalStudyTime: 0,
    notes: [
        { title: "Chapitre 1 : La Science du Sol", content: "Le sol est un milieu vivant et complexe. Ce chapitre examine sa composition (minéraux, matière organique, eau, air), sa structure et sa texture. La fertilité du sol dépend de ses propriétés physiques, chimiques et biologiques, qui influencent la disponibilité des nutriments pour les plantes." },
        { title: "Chapitre 2 : Physiologie Végétale", content: "Ce module se concentre sur le fonctionnement des plantes. Nous aborderons la photosynthèse (conversion de l'énergie lumineuse en énergie chimique), la respiration, l'absorption de l'eau et des nutriments par les racines, et le rôle des hormones végétales dans la croissance et le développement." },
        { title: "Chapitre 3 : Les Systèmes de Culture", content: "Ce chapitre présente les différents systèmes agricoles, de la monoculture intensive à l'agroécologie. Les concepts de rotation des cultures, de gestion intégrée des ravageurs et d'agriculture de conservation sont étudiés comme des moyens de produire durablement en préservant les ressources." }
    ],
    assignments: [],
  },
  {
    id: 'eco101',
    title: "Principes de l'économie générale",
    description: "Comprendre les théories et les mécanismes de base de l'économie.",
    faculty: "Économie",
    progress: 0,
    totalStudyTime: 0,
    notes: [
        { title: "Chapitre 1 : Offre et demande", content: "Le modèle de l'offre et de la demande est le concept central de l'économie de marché. La courbe de demande montre la quantité d'un bien que les consommateurs sont prêts à acheter à différents prix. La courbe d'offre montre la quantité que les producteurs sont prêts à vendre. Le point où ces deux courbes se croisent détermine le prix et la quantité d'équilibre du marché." },
        { title: "Chapitre 2 : Microéconomie et macroéconomie", content: "La microéconomie se concentre sur les décisions des agents économiques individuels : les ménages (consommation, épargne) et les entreprises (production, prix, investissement). La macroéconomie étudie l'économie dans sa globalité, en utilisant des indicateurs agrégés comme le Produit Intérieur Brut (PIB), le taux de chômage, le niveau général des prix (inflation) et la balance commerciale." },
        { title: "Chapitre 3 : L'inflation et la politique monétaire", content: "L'inflation est une augmentation durable et généralisée des prix, qui érode le pouvoir d'achat de la monnaie. Les banques centrales, comme la BCE, combattent l'inflation en utilisant la politique monétaire. Leur principal outil est le taux d'intérêt directeur : en l'augmentant, elles rendent le crédit plus cher, ce qui freine la consommation et l'investissement, et donc la hausse des prix." },
        { title: "Chapitre 4 : Le commerce international et la croissance", content: "Le commerce international permet aux pays de se spécialiser dans la production où ils ont un avantage comparatif (produire à un coût relatif plus faible), augmentant ainsi l'efficacité et la richesse mondiale. La croissance économique à long terme dépend de l'accumulation de capital (machines, infrastructures), de l'augmentation de la main-d'œuvre et, surtout, du progrès technologique." }
    ],
    assignments: [],
  },
   {
    id: 'eco-macro-201',
    title: "Macroéconomie Approfondie",
    description: "Analyse des modèles de croissance, des cycles économiques et des politiques budgétaires.",
    faculty: "Économie",
    progress: 0,
    totalStudyTime: 0,
    notes: [
        { title: "Chapitre 1 : Le modèle IS-LM", content: "Le modèle IS-LM (Investment-Saving / Liquidity preference-Money supply) est un outil keynésien qui montre comment l'équilibre se forme simultanément sur le marché des biens et services (courbe IS) et sur le marché monétaire (courbe LM). Il permet d'analyser l'impact des politiques budgétaires et monétaires sur le revenu national et le taux d'intérêt." },
        { title: "Chapitre 2 : Croissance Économique", content: "Ce chapitre explore les théories de la croissance, notamment le modèle de Solow. Il met en évidence le rôle crucial de l'accumulation de capital, de la croissance démographique et, surtout, du progrès technologique comme moteur de l'augmentation du niveau de vie à long terme." },
        { title: "Chapitre 3 : Les Cycles Économiques", content: "Les économies connaissent des phases d'expansion et de récession. Ce chapitre examine les causes de ces fluctuations, qu'elles proviennent de chocs de demande ou d'offre, et analyse le rôle des politiques de stabilisation (budgétaires et monétaires) pour atténuer l'amplitude de ces cycles." }
    ],
    assignments: [],
  },
  {
    id: 'med101',
    title: "Anatomie et Physiologie Humaine",
    description: "Introduction à la structure et au fonctionnement du corps humain.",
    faculty: "Médecine",
    progress: 0,
    totalStudyTime: 0,
    notes: [
        { title: "Chapitre 1 : Le Système Nerveux", content: "Le système nerveux est le centre de commande du corps. Il est divisé en système nerveux central (cerveau et moelle épinière) et périphérique. Ce chapitre explore la structure du neurone, la transmission de l'influx nerveux (potentiel d'action) et le fonctionnement des synapses." },
        { title: "Chapitre 2 : Le Système Cardiovasculaire", content: "Ce module décrit le cœur, les vaisseaux sanguins et le sang. Nous étudierons le cycle cardiaque (systole/diastole), la circulation sanguine (pulmonaire et systémique), et la régulation de la pression artérielle. La composition du sang et le rôle des globules rouges, blancs et plaquettes seront également abordés." },
        { title: "Chapitre 3 : Le Système Respiratoire", content: "Le système respiratoire assure les échanges gazeux entre l'air et le sang. Ce chapitre couvre l'anatomie des poumons et des voies respiratoires, les mécanismes de la ventilation (inspiration/expiration) et la manière dont l'oxygène et le dioxyde de carbone sont transportés dans le sang et échangés au niveau des alvéoles." }
    ],
    assignments: [],
  },
   {
    id: 'crim101',
    title: "Introduction à la Criminologie",
    description: "Étude du phénomène criminel, de ses causes et des réponses sociales.",
    faculty: "Criminologie",
    progress: 0,
    totalStudyTime: 0,
    notes: [
        { title: "Chapitre 1 : Qu'est-ce que la criminologie ?", content: "La criminologie est une science sociale qui étudie le crime en tant que phénomène social. Elle s'intéresse à ses causes (facteurs sociaux, psychologiques), à ses formes, aux criminels, aux victimes, et à la réaction sociale face au crime (système pénal, prévention)." },
        { title: "Chapitre 2 : Grandes théories criminologiques", content: "Ce chapitre présente les principales écoles de pensée. Des théories sociologiques (école de Chicago, tension structurelle de Merton) qui lient le crime à l'environnement social, aux théories psychologiques qui se concentrent sur les traits de personnalité et les processus mentaux des délinquants." },
        { title: "Chapitre 3 : La mesure du crime et la victimologie", content: "Comment mesure-t-on la criminalité ? Nous analyserons les statistiques officielles de la police et de la justice, ainsi que les enquêtes de victimation qui permettent de mesurer le 'chiffre noir' du crime (les faits non déclarés). La victimologie, l'étude des victimes, sera également abordée." }
    ],
    assignments: [],
  },
  {
    id: 'poly-rdm-101',
    title: "Résistance des Matériaux (RDM)",
    description: "Étude du comportement des matériaux solides soumis à des contraintes.",
    faculty: "Polytechnique",
    progress: 0,
    totalStudyTime: 0,
    notes: [
        { title: "Chapitre 1 : Contraintes et Déformations", content: "Ce chapitre introduit les concepts fondamentaux de contrainte (force interne par unité de surface) et de déformation (changement de forme relatif). La loi de Hooke établit la relation linéaire entre contrainte et déformation pour les matériaux élastiques, définie par le module de Young." },
        { title: "Chapitre 2 : Traction et Compression", content: "Analyse des barres soumises à des forces axiales. Nous apprendrons à calculer les contraintes normales, les allongements, et à vérifier la résistance d'une pièce en comparant la contrainte maximale à la limite d'élasticité du matériau pour éviter la déformation permanente." },
        { title: "Chapitre 3 : Torsion et Flexion", content: "La torsion étudie les pièces soumises à un couple (arbres de transmission). La flexion analyse le comportement des poutres soumises à des charges transversales, ce qui est crucial pour la conception de ponts, de planchers ou de toute structure porteuse. Nous calculerons les contraintes de cisaillement et les contraintes normales de flexion." }
    ],
    assignments: [],
  },
  {
    id: 'webdev301',
    title: "Programmation Web",
    description: "Créez des sites web dynamiques avec HTML5, CSS3 et JavaScript.",
    faculty: "Informatique",
    progress: 0,
    totalStudyTime: 0,
    notes: [
        { title: "Chapitre 1 : HTML5 - La structure des pages web", content: "HTML est le langage de balisage qui définit la structure sémantique d'une page web. Les balises comme `<header>`, `<main>`, `<article>` et `<footer>` ne servent pas qu'à la mise en page ; elles donnent un sens au contenu pour les navigateurs et les lecteurs d'écran, ce qui est crucial pour l'accessibilité et le référencement (SEO)." },
        { title: "Chapitre 2 : CSS3 - Le style et la mise en page", content: "CSS est utilisé pour styliser le HTML. Le 'responsive design' est une approche fondamentale qui vise à créer des pages qui s'affichent parfaitement sur tous les appareils (mobiles, tablettes, ordinateurs). Pour cela, on utilise des techniques modernes comme Flexbox (pour les alignements sur un axe) et CSS Grid (pour les mises en page complexes sur deux axes)." },
        { title: "Chapitre 3 : JavaScript - L'interactivité côté client", content: "JavaScript est le langage de programmation qui s'exécute dans le navigateur de l'utilisateur. Il permet de manipuler le DOM (la représentation en mémoire de la page HTML) pour créer, modifier ou supprimer des éléments dynamiquement. La gestion des événements permet de réagir aux actions de l'utilisateur, comme un clic de souris ou une saisie au clavier." },
        { title: "Chapitre 4 : Interaction avec les API", content: "Les API (Application Programming Interfaces) permettent à votre site web de communiquer avec des serveurs pour obtenir ou envoyer des données sans recharger la page. On utilise généralement l'objet `fetch` en JavaScript pour effectuer des requêtes HTTP asynchrones. Les données sont souvent échangées au format JSON (JavaScript Object Notation), un format texte léger et facile à manipuler." }
    ],
    assignments: [],
  },
  {
    id: 'archi401',
    title: "Architecture de l'ordinateur",
    description: "Étude de la conception et de l'organisation des systèmes informatiques.",
    faculty: "Informatique",
    progress: 0,
    totalStudyTime: 0,
    notes: [
        { title: "Chapitre 1 : Organisation et conception des systèmes informatiques", content: "Ce chapitre explore l'architecture de Von Neumann, le modèle fondamental de la plupart des ordinateurs modernes. Il se compose de quatre parties principales : l'unité centrale de traitement (CPU), la mémoire principale (RAM), les dispositifs d'entrée/sortie (clavier, écran) et le bus qui les relie. Nous étudions comment ces composants interagissent pour exécuter des instructions." },
        { title: "Chapitre 2 : Conception du processeur (CPU)", content: "Le CPU, ou processeur, est le cerveau de l'ordinateur. Il est composé d'une unité arithmétique et logique (ALU) qui effectue les calculs, d'une unité de contrôle qui orchestre les opérations, et de registres pour un stockage ultra-rapide. Le pipelining est une technique clé qui permet au CPU de traiter plusieurs instructions en parallèle, comme sur une chaîne de montage, ce qui augmente considérablement les performances." },
        { title: "Chapitre 3 : Hiérarchie de la mémoire", content: "L'accès à la mémoire est souvent un goulot d'étranglement. Pour y remédier, les ordinateurs utilisent une hiérarchie de mémoires. En haut, les registres rapides et petits du CPU. Ensuite, plusieurs niveaux de cache (L1, L2, L3), plus lents mais plus grands, qui stockent les données fréquemment utilisées. Enfin, la RAM et le stockage de masse (SSD/HDD). Ce système permet de garder les données les plus pertinentes au plus près du processeur." },
        { title: "Chapitre 4 : Systèmes d'entrée/sortie (E/S) et parallélisme", content: "Ce chapitre traite de la communication entre le CPU et les périphériques externes (disques, réseaux, etc.). Il aborde également le parallélisme, un concept fondamental dans l'informatique moderne. Les architectures multicœurs, avec plusieurs processeurs sur une même puce, et le traitement parallèle (utilisé par les cartes graphiques - GPU) permettent d'exécuter un grand nombre de calculs simultanément pour des tâches comme l'intelligence artificielle ou le calcul scientifique." }
    ],
    assignments: [],
  },
  {
    id: 'fr101',
    title: "Français : Communication professionnelle",
    description: "Maîtrisez la communication écrite et orale dans un contexte professionnel.",
    faculty: "Informatique",
    progress: 0,
    totalStudyTime: 0,
    notes: [
        { title: "Chapitre 1 : Les bases de la communication écrite", content: "Ce chapitre couvre les fondamentaux de l'écriture professionnelle : clarté, concision, et ton adapté. Nous reverrons les règles de grammaire essentielles, la syntaxe et la ponctuation pour garantir des écrits sans erreurs. L'accent sera mis sur la rédaction d'e-mails professionnels efficaces." },
        { title: "Chapitre 2 : Rédaction de documents techniques", content: "Apprenez à structurer et rédiger des documents techniques clairs. Ce module aborde les rapports d'incident, les spécifications fonctionnelles et la documentation utilisateur. Nous travaillerons sur la manière de vulgariser des concepts complexes pour un public non technique." },
        { title: "Chapitre 3 : Prise de parole en public", content: "Développez votre aisance à l'oral. Ce chapitre est axé sur la structuration d'un discours, la gestion du trac, l'utilisation de supports visuels (diapositives) et les techniques pour capter et maintenir l'attention de votre auditoire lors de présentations techniques ou de réunions." }
    ],
    assignments: [],
  },
  {
    id: 'en202',
    title: "Anglais pour l'informatique",
    description: "Améliorez votre anglais technique pour la documentation et la communication.",
    faculty: "Informatique",
    progress: 0,
    totalStudyTime: 0,
    notes: [
        { title: "Chapter 1: Technical Vocabulary", content: "This chapter focuses on building a strong vocabulary for the IT field. We will cover key terms related to hardware, software, networking, cybersecurity, and software development. The goal is to understand and use technical terms accurately in context." },
        { title: "Chapter 2: Reading Technical Documentation", content: "Learn how to efficiently read and understand technical documents such as API documentation, research papers, and official manuals. We will practice identifying main ideas, extracting specific information, and understanding complex technical descriptions." },
        { title: "Chapter 3: Professional Communication in English", content: "This module covers writing professional emails, participating in technical meetings, and presenting project updates in English. We will focus on polite and clear communication, handling questions, and using appropriate business English etiquette for the tech industry." }
    ],
    assignments: [],
  },
  {
    id: 'math303',
    title: "Mathématiques pour l'ingénieur informaticien",
    description: "Algèbre linéaire, probabilités et logique pour l'informatique.",
    faculty: "Informatique",
    progress: 0,
    totalStudyTime: 0,
    notes: [
        { title: "Chapitre 1 : Algèbre linéaire", content: "L'algèbre linéaire est fondamentale pour l'informatique graphique, l'apprentissage automatique et bien plus encore. Ce chapitre couvre les vecteurs, les matrices, les opérations matricielles (addition, multiplication), les déterminants, et la résolution de systèmes d'équations linéaires." },
        { title: "Chapitre 2 : Probabilités et statistiques", content: "Ce module introduit les concepts de base des probabilités et des statistiques, essentiels pour l'analyse de données et l'intelligence artificielle. Nous aborderons les probabilités conditionnelles, le théorème de Bayes, les variables aléatoires, les distributions de probabilité (normale, binomiale) et les tests d'hypothèses." },
        { title: "Chapitre 3 : Logique et mathématiques discrètes", content: "Les mathématiques discrètes sont le fondement de l'informatique. Ce chapitre explore la logique propositionnelle, la théorie des ensembles, les relations, les fonctions, la théorie des graphes et les techniques de comptage. Ces concepts sont cruciaux pour la conception d'algorithmes et la vérification de programmes." }
    ],
    assignments: [],
  },
  {
    id: 'elec101',
    title: "Électricité : Principes et applications",
    description: "Introduction à la théorie des circuits électriques et aux lois fondamentales.",
    faculty: "Polytechnique",
    progress: 0,
    totalStudyTime: 0,
    notes: [
      { title: "Chapitre 1 : Lois fondamentales", content: "Ce chapitre couvre les concepts de base de l'électricité : courant, tension et résistance. La loi d'Ohm (V=IR) est introduite comme la relation fondamentale liant ces trois grandeurs. Les lois de Kirchhoff sont également présentées pour analyser des circuits plus complexes." },
      { title: "Chapitre 2 : Circuits en série et en parallèle", content: "Analyse des circuits contenant des résistances en série et en parallèle. Nous apprendrons à calculer la résistance équivalente, la tension et le courant dans chaque partie du circuit. Ces concepts sont essentiels pour comprendre comment les composants sont combinés dans des dispositifs réels." },
      { title: "Chapitre 3 : Introduction au magnétisme", content: "Ce chapitre explore la relation entre l'électricité et le magnétisme. Il aborde la manière dont un courant électrique peut générer un champ magnétique (loi d'Ampère) et comment un champ magnétique variable peut induire un courant dans un circuit (loi de Faraday sur l'induction)." }
    ],
    assignments: []
  }
];

export const getCourses = (): Course[] => {
    // In a real app, you might fetch this from an API
    // For now, we'll use the hardcoded data
    return courses;
};

export const getCourseById = (id: string): Course | undefined => {
    return courses.find(course => course.id === id);
};
