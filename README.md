# NeuroFlow

Une collection d'applications web progressives (PWA) conçues pour répondre aux besoins des utilisateurs modernes en matière de productivité, de créativité et de bien-être mental. Développée avec une approche scientifique et éthique, cette suite offre des solutions gratuites, respectueuses de la vie privée et entièrement fonctionnelles hors ligne.

**Lien du Projet** : [NeuroFlow](https://neurofloow.netlify.app/)

## Fonctionnalités Principales

### 📝 Productivité & Organisation

#### ZenPad - Éditeur de Texte Zen
- **Objectif** : Créer l'expérience d'écriture la plus épurée possible pour favoriser la concentration et le flow créatif.
- **Fonctionnalités** :
  - Zone de texte plein écran sans bordures.
  - Auto-save toutes les 3 secondes en localStorage.
  - Compteurs discrets (mots/caractères) masquables.
  - Shortcuts clavier essentiels (Ctrl+S, Ctrl+Z, etc.).
  - Mode sombre automatique selon l'heure système.

#### LocalBoard - Kanban Hors-ligne
- **Objectif** : Rendre la gestion de projet aussi fluide que manipuler des objets physiques.
- **Fonctionnalités** :
  - Création de tableaux avec colonnes personnalisables.
  - Cartes avec titre, description, couleur.
  - Drag & drop fluide HTML5.
  - Sauvegarde temps réel localStorage.
  - Templates de base (To Do, Doing, Done).

#### MindFlow - Cartes Mentales Locales
- **Objectif** : Libérer la pensée visuelle avec une interface intuitive.
- **Fonctionnalités** :
  - Création de nœuds par double-clic.
  - Connexions automatiques parent-enfant.
  - Édition inline texte.
  - Pan/zoom fluide (molette + tactile).
  - Auto-layout basique (radial).

### 🎨 Créativité & Design

#### PixelCraft - Éditeur Pixel Art
- **Objectif** : Démocratiser la création pixel art avec des outils professionnels dans une interface accessible.
- **Fonctionnalités** :
  - Canvas avec grille magnétique.
  - Outils : pixel, ligne, rectangle, fill, pipette.
  - Palette couleurs indexées (limitation authentique).
  - Zoom jusqu'à 6400% sans pixellisation.
  - Undo/redo illimité avec preview.

#### ColorMaster - Studio Couleurs
- **Objectif** : Créer l'outil couleur le plus intuitif pour la théorie chromatique.
- **Fonctionnalités** :
  - Roue chromatique interactive HSL.
  - Schémas automatiques (complémentaire, triadique, etc.).
  - Tests contraste WCAG avec scoring temps réel.
  - Simulation daltonisme (deutéranopie, protanopie, tritanopie).
  - Export développeur (HEX, RGB, HSL, CSS variables).

### 💪 Bien-être & Santé

#### MindfulBreath - Guide Respiration
- **Objectif** : Transformer la respiration consciente en outil quotidien accessible.
- **Fonctionnalités** :
  - 5 techniques fondamentales (4-7-8, box breathing, etc.).
  - Guides visuels animés (cercle expansion/contraction).
  - Audio coaching voix apaisante.
  - Timer flexible avec vibration tactile.
  - Mode urgence pour crises d'anxiété.

#### MoodTracker - Suivi Humeur
- **Objectif** : Créer le journal émotionnel le plus bienveillant.
- **Fonctionnalités** :
  - Échelle humeur multi-dimensionnelle (énergie, anxiété, joie).
  - Journal émotionnel avec prompts bienveillants.
  - Facteurs déclencheurs personnalisables.
  - Visualisations tendances non-alarmistes.
  - Export sécurisé pour professionnels santé.

### 🎓 Apprentissage & Mémoire

#### FlashMaster - Cartes Mémoire Avancées
- **Objectif** : Révolutionner l'apprentissage par répétition espacée.
- **Fonctionnalités** :
  - Algorithme répétition espacée (SM-2 amélioré).
  - Cartes recto-verso avec rich media.
  - Deck organization hiérarchique.
  - Stats apprentissage détaillées.
  - Import/export Anki compatibility.

### 🔧 Utilitaires Techniques

#### PasswordVault - Coffre-fort Mots de Passe
- **Objectif** : Démocratiser la sécurité numérique avec un gestionnaire de mots de passe simple et sécurisé.
- **Fonctionnalités** :
  - Chiffrement AES-256 avec master password.
  - Générateur mots de passe configurables.
  - Import navigateurs principaux.
  - Audit force mots de passe existants.
  - Export chiffré pour backup.

### 📊 Analyse & Données

#### DataViz - Visualisateur Données
- **Objectif** : Transformer les données brutes en insights visuels compréhensibles.
- **Fonctionnalités** :
  - Import CSV/JSON avec auto-detection schema.
  - 12+ types charts essentiels.
  - Filtres interactifs drag & drop.
  - Export PNG/SVG haute résolution.
  - Templates dashboards par industrie.

## Architecture Technique Globale

### Stack Technologique Principal
- **Frontend Core** : React 18 avec hooks pour la gestion d'état, Vite pour le build tool et le hot reload, TypeScript strict pour la sécurité des types.
- **UI/UX Framework** : Tailwind CSS 3 pour le styling responsive, Headless UI pour les composants accessibles, Framer Motion pour les animations fluides, Chart.js/D3.js pour les visualisations de données.
- **Data Management** : Supabase pour le backend-as-a-service, LocalStorage/IndexedDB pour les données offline, Zustand pour la gestion d'état global, React Query pour le cache d'état serveur.
- **Intégrations Spécialisées** : PDF-lib pour l'export de documents, jsPDF pour la génération de rapports, WorkBox pour les service workers avancés, Web Share API pour le partage natif.

### Architecture Modulaire
- **Structure du Projet** :
  - `src/` : Composants réutilisables, calculateurs spécialisés, composants de suivi, générateurs de programmes, composants UI de base.
  - `hooks/` : Hooks personnalisés.
  - `utils/` : Utilitaires de calcul.
  - `data/` : Données de référence.
  - `types/` : Types TypeScript.
  - `stores/` : Gestion d'état.

- **Patterns d'Architecture** :
  - Composants composés pour la flexibilité.
  - Hooks personnalisés pour la logique réutilisable.
  - Pattern Factory pour les générateurs.
  - Pattern Observer pour le suivi.
  - Pattern Strategy pour les algorithmes de calcul.

## Installation

Pour installer et exécuter OpenToolsAI Suite localement, suivez ces étapes :

1. **Cloner le Dépôt** :
   - Clonez le dépôt du projet depuis GitHub en utilisant la commande `git clone`.

2. **Accéder au Répertoire du Projet** :
   - Accédez au répertoire du projet clonné en utilisant la commande `cd`.

3. **Installer les Dépendances Nécessaires** :
   - Installez les dépendances nécessaires en utilisant `npm install` ou `yarn install`.

4. **Configurer les Variables d'Environnement** :
   - Configurez les variables d'environnement nécessaires pour le backend et le frontend.

5. **Lancer l'Application** :
   - Lancez l'application en utilisant la commande `npm start` ou `yarn start`.

## Utilisation

1. **Connexion** :
   - Connectez-vous à votre compte ou créez-en un nouveau en utilisant l'interface de connexion.

2. **Création Visuelle** :
   - Utilisez les outils de création visuelle pour générer des avatars, des QR codes artistiques, et extraire des palettes de couleurs.

3. **Traitement de Texte** :
   - Utilisez les outils de traitement de texte pour détecter des langues, résumer des textes, et plus encore.

4. **Outils de Développement** :
   - Utilisez les outils de développement pour formater et valider du JSON, encoder et décoder du Base64, et plus encore.

5. **Audio & Image** :
   - Utilisez les outils audio et image pour compresser des images, visualiser de l'audio, et plus encore.

6. **Analyse & Utilitaires** :
   - Utilisez les outils d'analyse et utilitaires pour vérifier la force des mots de passe, et plus encore.

## Contribution

Les contributions sont les bienvenues ! Pour contribuer à OpenToolsAI Suite, suivez ces étapes :

1. **Fork le Projet** :
   - Fork le projet sur GitHub pour créer votre propre copie du dépôt.

2. **Créez une Branche pour Votre Fonctionnalité** :
   - Créez une branche pour votre fonctionnalité ou correction de bug en utilisant la commande `git checkout -b feature/AmazingFeature`.

3. **Commitez Vos Changements** :
   - Commitez vos changements avec un message de commit clair et descriptif en utilisant la commande `git commit -m 'Add some AmazingFeature'`.

4. **Poussez vers la Branche** :
   - Poussez vos changements vers la branche sur votre fork en utilisant la commande `git push origin feature/AmazingFeature`.

5. **Ouvrez une Pull Request** :
   - Ouvrez une Pull Request pour que vos changements soient revus et fusionnés dans le projet principal.

## Contact

Pour plus d'informations ou pour poser des questions sur le projet, vous pouvez contacter :

**Anass Houdzi** : anass.houdzi@gmail.com
