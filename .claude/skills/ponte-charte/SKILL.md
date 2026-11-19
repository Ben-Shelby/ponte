---
name: ponte-charte
description: Charte visuelle et ton de l'appli Ponte (style Apple très sobre, Arco la mascotte). À lire avant de modifier l'interface, d'ajouter un écran ou de créer un visuel pour Ponte.
---

# Charte Ponte

Validée par l'utilisateur le 19 novembre 2026. Il veut une appli au niveau d'Apple : épurée, peu chargée, sans les polices « de base » qu'on retrouve partout.

## Typographie

- Interface : police système Apple (`-apple-system`, SF Pro). Sur les autres appareils : Golos Text.
- Lecture des textes en langue étrangère : `ui-serif` (New York sur iPhone), sinon Literata.
- Arabe : SF Arabic sur iPhone, sinon Noto Naskh Arabic. Toujours `dir="rtl"`.
- Jamais Inter, Space Grotesk ni Roboto.
- Grands titres d'écran : 32 px, gras, interlettrage -0,025 em. Titres de carte : 21 px, semi-gras.

## Couleurs

- Les jetons sont dans `css/app.css` (`:root`), avec un vrai mode sombre. Ne jamais écrire une couleur en dur dans un composant.
- Une seule couleur d'accent : bleu cobalt des azulejos, `#2347C6` (sombre : `#7D98FF`).
- Vert et orange servent uniquement à dire juste ou faux.
- Fond gris très clair `#F3F4F7`, cartes blanches.

## Composants

- Listes groupées façon iOS (rangées de 56 px, séparateurs fins décalés).
- Cartes : rayon 16 à 22 px, ombre légère. Boutons : 50 px de haut, rayon 14 px.
- Icônes : traits fins (1,7 px) dans une grille de 24 px, dessinées à la main en SVG. Pas d'emoji.
- Un écran, une action principale. Le bouton principal reste en bas, collé (`cta-bar`).
- Animations rares et courtes ; `prefers-reduced-motion` respecté.

## Arco, la mascotte

- Personnage original : l'arche du logo Ponte qui prend vie (yeux, sourire, joues).
- Une variante par langue : portugais = bleu avec motif d'azulejos ; russe = rouge brique avec une chapka ; arabe = vert profond avec un treillis géométrique doré.
- Il apparaît peu : salut sur l'écran du jour, écrans de fin, Bibliothèque, icône de l'appli.
- Ne jamais reproduire une mascotte existante (La'eeb de la Coupe du monde 2022 ou autre), même « inspirée ».

## Ton

- Français, tutoiement, phrases courtes. Pas de jargon technique dans l'appli.
- Les boutons disent ce qui se passe : « Commencer », « J'ai lu, continuer », « Redire la réponse modèle ».
- Les explications de grammaire tiennent en une ou deux phrases, avec un exemple.
- Russe : accents toniques (´) dans les contenus d'apprentissage. Arabe : voyelles notées.
