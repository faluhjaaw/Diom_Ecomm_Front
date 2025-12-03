# Shop-sen - Plateforme E-commerce

Shop-sen est une plateforme e-commerce moderne construite avec React, TypeScript et Vite. Elle offre une expérience d'achat complète avec des fonctionnalités pour les clients, les vendeurs et les administrateurs.

## Fonctionnalités

### Pour les Clients

- Parcourir les produits par catégories
- Consulter les informations détaillées des produits avec images et spécifications
- Ajouter des produits au panier et gérer les quantités
- Processus de paiement sécurisé
- Suivi et historique des commandes
- Gestion du profil utilisateur
- Avis et notes sur les produits

### Pour les Vendeurs

- Inscription et gestion du profil vendeur
- Ajout et gestion des produits
- Tableau de bord pour le suivi des ventes
- Gestion de l'inventaire

### Fonctionnalités Générales

- Authentification et autorisation des utilisateurs (rôles Client, Vendeur, Admin)
- Design responsive avec Tailwind CSS
- Fonctionnalité de panier d'achat
- Recherche et filtrage des produits
- Offres du jour et promotions
- Vitrine des meilleures ventes
- Présentation des marques

## Stack Technique

- **Framework Frontend**: React 18.2
- **Langage**: TypeScript
- **Outil de Build**: Vite 6.0
- **Routage**: React Router DOM 6.30
- **Styles**: Tailwind CSS 3.4
- **Composants UI**: Shadcn UI avec Radix UI
- **Icônes**: Lucide React
- **Formulaires**: React Hook Form avec validation Zod
- **Client HTTP**: Axios
- **Utilitaires**: clsx, tailwind-merge

## Démarrage

### Prérequis

- [Node.js](https://nodejs.org/en/) (version 16 ou supérieure recommandée)
- Gestionnaire de paquets npm ou yarn

### Installation

1. Cloner le dépôt :

```bash
git clone <url-du-dépôt>
cd project
```

2. Installer les dépendances :

```bash
npm install
```

3. Démarrer le serveur de développement :

```bash
npm run dev
```

4. Ouvrir votre navigateur et accéder à [http://localhost:5173/](http://localhost:5173/)

### Build pour la Production

Pour créer un build de production optimisé :

```bash
npm run build
```

Les fichiers compilés seront générés dans le répertoire `dist`.

## Structure du Projet

```
project/
├── src/
│   ├── components/          # Composants UI réutilisables
│   │   └── ui/             # Composants Shadcn UI (button, card, input, badge)
│   ├── hooks/              # Hooks React personnalisés
│   │   ├── useAuth.ts      # Hook d'authentification
│   │   ├── useCart.ts      # Hook du panier d'achat
│   │   └── useProducts.ts  # Hook de gestion des produits
│   ├── lib/                # Bibliothèques utilitaires
│   │   ├── axios.ts        # Configuration Axios
│   │   ├── cart-utils.ts   # Fonctions utilitaires du panier
│   │   ├── jwt.ts          # Utilitaires pour les tokens JWT
│   │   └── utils.ts        # Utilitaires généraux
│   ├── router/             # Routage de l'application
│   │   └── index.tsx       # Définition des routes
│   ├── screens/            # Composants de pages
│   │   ├── Accueil/        # Page d'accueil avec plusieurs sections
│   │   ├── AddProduct/     # Page d'ajout de produit (vendeur)
│   │   ├── CartPage/       # Page du panier d'achat
│   │   ├── Checkout/       # Page de paiement
│   │   ├── Login/          # Page de connexion
│   │   ├── Orders/         # Page d'historique des commandes
│   │   ├── ProductDetail/  # Page de détails du produit
│   │   ├── Products/       # Page de liste des produits
│   │   ├── Profile/        # Page de profil utilisateur
│   │   ├── Register/       # Inscription client
│   │   ├── RegisterVendor/ # Inscription vendeur
│   │   ├── Reviews/        # Avis sur les produits
│   │   ├── VendorDashboard/# Tableau de bord vendeur
│   │   └── VendorProfile/  # Profil vendeur
│   ├── services/           # Services API
│   │   ├── auth.service.ts      # API d'authentification
│   │   ├── avis.service.ts      # API des avis
│   │   ├── cart.service.ts      # API du panier
│   │   ├── category.service.ts  # API des catégories
│   │   ├── order.service.ts     # API des commandes
│   │   ├── product.service.ts   # API des produits
│   │   ├── user.service.ts      # API utilisateur
│   │   └── vendor.service.ts    # API vendeur
│   ├── types/              # Définitions de types TypeScript
│   │   └── index.ts        # Types principaux (User, Product, Cart, Order, etc.)
│   └── index.tsx           # Point d'entrée de l'application
├── public/                 # Ressources statiques
├── index.html             # Template HTML
├── package.json           # Dépendances et scripts
├── tailwind.css           # Configuration Tailwind CSS
├── tsconfig.json          # Configuration TypeScript
└── vite.config.ts         # Configuration Vite
```

## Routes Disponibles

- `/` - Page d'accueil
- `/login` - Connexion utilisateur
- `/register` - Inscription client
- `/register-vendeur` - Inscription vendeur
- `/products` - Liste des produits
- `/products/:id` - Détails du produit
- `/cart` - Panier d'achat
- `/checkout` - Processus de paiement
- `/orders` - Historique des commandes
- `/profile` - Profil utilisateur
- `/vendor-profile` - Profil vendeur
- `/vendor-dashboard` - Tableau de bord vendeur
- `/add-product` - Ajouter un nouveau produit (vendeur uniquement)
- `/reviews` - Avis sur les produits

## Rôles Utilisateur

L'application prend en charge trois rôles utilisateur :

- **ADMIN** : Accès complet au système et administration
- **CUSTOMER** : Parcourir les produits, effectuer des achats, évaluer les produits
- **VENDEUR** : Gérer les produits, consulter le tableau de bord des ventes

## Intégration API

L'application est conçue pour fonctionner avec une API backend. Tous les appels API sont centralisés dans le répertoire `services/` en utilisant Axios pour les requêtes HTTP.

Les services clés incluent :

- Authentification (connexion, inscription, gestion des tokens)
- Gestion des produits (opérations CRUD)
- Opérations du panier (ajouter, supprimer, mettre à jour les quantités)
- Traitement des commandes (créer, suivre, consulter l'historique)
- Gestion du profil utilisateur
- Avis et notes sur les produits

## Développement

### Ajout de Nouveaux Composants

Les composants UI sont construits avec Shadcn UI. Pour ajouter de nouveaux composants, placez-les dans `src/components/ui/`.

### Ajout de Nouvelles Pages

1. Créer un nouveau dossier dans `src/screens/`
2. Ajouter vos fichier(s) de composant
3. Créer un fichier d'export `index.ts`
4. Ajouter la route dans `src/router/index.tsx`

### Hooks Personnalisés

La logique réutilisable est extraite dans des hooks personnalisés situés dans `src/hooks/`. Les hooks actuels incluent :

- `useAuth` - État et méthodes d'authentification utilisateur
- `useCart` - État et opérations du panier d'achat
- `useProducts` - Récupération et gestion des données produits

## Contribution

1. Forker le dépôt
2. Créer votre branche de fonctionnalité (`git checkout -b feature/NouvelleFonctionnalite`)
3. Commiter vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Pousser vers la branche (`git push origin feature/NouvelleFonctionnalite`)
5. Ouvrir une Pull Request

## Licence

Ce projet fait partie de la suite DiomEcommerce.

## Support

Pour le support et les questions, veuillez ouvrir une issue dans le dépôt.
