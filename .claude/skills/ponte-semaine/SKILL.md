---
name: ponte-semaine
description: Prépare et publie une semaine de contenus Ponte (articles du jour en portugais, textes à trous, oral guidé). À utiliser pour la routine hebdomadaire du dimanche, ou quand on demande de préparer, refaire ou corriger des articles Ponte.
---

# Préparer une semaine de Ponte

Ponte est l'appli de langues de l'utilisateur : un article court par jour, à lire le matin, puis un petit oral le soir. Ce skill est la recette validée par l'utilisateur le 19 novembre 2026. La routine doit rester sobre : l'utilisateur ne veut pas dépenser son quota Claude Pro pour rien.

## 0. Pause si l'utilisateur ne s'en sert plus

1. Lire `content/config.json`, bloc `activity`.
2. Si `activity.sheet_id` est vide, il n'y a pas encore de signal d'activité : continuer.
3. Sinon, lire la feuille Google Sheets `sheet_id` avec le connecteur Google Sheets. Chaque ligne est une séance terminée dans l'appli (horodatage, puis « AAAA-MM-JJ type »).
4. Si aucune ligne n'a moins de `pause_after_days` jours : **ne rien générer, ne rien publier**. Terminer avec une ligne de compte rendu : « Ponte en pause : aucune séance depuis le … ». Cette vérification doit rester courte.
5. Sinon, continuer.

## 1. Quelle semaine

- Préparer les 7 jours du lundi suivant au dimanche suivant (fuseau Europe/Paris).
- Si un de ces jours existe déjà dans `content/index.json`, ne pas le réécrire.
- Lundi à vendredi : `"kind": "actu"`. Samedi et dimanche : `"kind": "detente"` (voir `config.schedule`).

## 2. Trouver l'actualité (lundi à vendredi)

- 5 sujets différents, publiés dans les 7 derniers jours, pris dans `config.themes.semaine`. Varier les thèmes sur la semaine.
- Sujets liés au Portugal, au Brésil ou à l'Europe quand c'est possible : énergie, IA et tech, infrastructures, business, géopolitique. Pas de faits divers, de violence ni de polémique gratuite.
- Sources fiables, de préférence portugaises (Público, Expresso, Observador, ECO, Jornal de Negócios, RTP, Lusa, Dinheiro Vivo, portugal.gov.pt), sinon grandes agences. Une source par article, avec une URL réelle et vérifiée.
- Ne jamais inventer un fait, un chiffre ou une citation. Simplifier, oui ; déformer, non. Un chiffre incertain ne se donne pas.
- Écrire avec ses propres mots, sans recopier de phrases de la source.
- Rester économe : une ou deux recherches par sujet, une quinzaine au total.

## 3. Écrire chaque article

Fichier `content/days/AAAA-MM-JJ.json`. Prendre un fichier existant comme modèle (schéma en fin de page).

**Langue**
- Portugais du Portugal (pt-PT), orthographe de l'Accord de 1990 (eletricidade, ação). Vocabulaire du Portugal : comboio, autocarro, pequeno-almoço, casa de banho, ecrã, « ter de ». Tutoiement en « tu ». Pronoms après le verbe (senta-se).
- Niveau A1 : 5 à 7 phrases courtes, une idée par phrase, 50 à 90 mots. Présent surtout, futur proche (ir + infinitif). Un passé au plus par article, toujours glosé.
- Préférer les mots transparents pour un francophone.

**Vocabulaire**
- 5 à 7 mots nouveaux par article (`"new": true`), utiles en dehors de l'article.
- Reprendre 2 ou 3 mots des articles des jours précédents (lire les fichiers récents), sans les marquer `new`.
- Baliser dans le texte `[[forme affichée|clé]]` : tous les mots nouveaux, plus 6 à 10 autres mots utiles. La clé est en minuscules, sans accent ni espace.
- Glossaire : `w` = forme du dictionnaire (avec l'article : a lei, o vento ; ou l'infinitif) ; `fr` = le sens ; `note` = la forme rencontrée et une astuce, en français, une ou deux phrases.
- Chaque phrase a sa traduction `fr`, naturelle et pas mot à mot. Titre court en `pt` et en `fr`.

**Textes à trous (exactement 3)**
- Reprendre une phrase de l'article et enlever un mot ou une courte locution.
- 3 options : la bonne réponse et 2 pièges plausibles qui travaillent un point précis (singulier ou pluriel, genre, infinitif, faux ami, mot voisin). Jamais deux options correctes.
- `why` : une ou deux phrases en français qui expliquent la règle.

**Oral guidé**
- `question` en pt et fr, sur l'article ; on y répond en une phrase.
- `starter` : le début de la réponse.
- `model` : réponse modèle de 6 à 12 mots, avec le vocabulaire du jour.
- `keywords` : 3 ou 4 mots de la réponse modèle, écrits exactement comme dans `model`.
- `tip` : le piège de grammaire le plus probable, expliqué simplement.
- Le week-end, la question est une petite scène de la vie : commander, réserver, demander son chemin, parler de ses loisirs.

## 4. Réserve

`content/reserve/` contient des articles détente intemporels, servis les jours sans article. S'il y en a moins de 6, en ajouter un par semaine (id `reserve-<mot>`) et l'ajouter à `index.json`.

## 5. Index et vérification

- Ajouter les 7 jours à `content/index.json`, triés par date, avec `id`, `kind`, `theme` et `title`. Mettre `updated` à la date du jour. Garder les anciens jours.
- Lancer `python3 tools/validate.py` (sous Windows : `py tools/validate.py`). Corriger toutes les erreurs, et les avertissements quand c'est possible.
- Relire chaque article comme un professeur de portugais : orthographe pt-PT, accords, conjugaisons, accents, traductions.

## 6. Publier

- `git add content` puis `git commit -m "Contenu : semaine du <lundi> au <dimanche>"`, puis `git push origin main`.
- GitHub Pages remet le site à jour tout seul en une à deux minutes.
- Dans la routine, ne jamais modifier le code de l'appli (`index.html`, `css/`, `js/`).

## Calendrier des langues

- Jusqu'au 31 janvier 2027 : portugais uniquement.
- À partir de février 2027, le russe devient la langue focus. Ne pas l'ajouter dans la routine avant que l'utilisateur ait validé le format, dans une session normale.

## Schéma d'un article

```json
{
  "id": "2026-11-23",
  "lang": "pt",
  "kind": "actu",
  "theme": "Énergie",
  "level": "A1",
  "title": {"pt": "…", "fr": "…"},
  "source": {"name": "Público", "url": "https://…"},
  "paragraphs": [
    [{"pt": "Phrase avec un [[mot|cle]].", "fr": "Traduction."}],
    [{"pt": "…", "fr": "…"}]
  ],
  "glossary": {
    "cle": {"w": "o mot", "fr": "le mot", "note": "Astuce courte.", "new": true}
  },
  "cloze": [
    {"before": "Début de phrase", "answer": "mot", "after": "fin de phrase.", "options": ["mot", "piège 1", "piège 2"], "why": "Explication."}
  ],
  "oral": {
    "question": {"pt": "…?", "fr": "… ?"},
    "starter": "Début…",
    "model": {"pt": "Réponse modèle.", "fr": "Traduction."},
    "keywords": ["mot1", "mot2", "mot3"],
    "tip": {"title": "Le point de grammaire", "text": "Explication simple."}
  }
}
```

Pour un article détente, `"source": null`.
