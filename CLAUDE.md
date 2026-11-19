# Ponte

Appli personnelle d'apprentissage des langues (portugais du Portugal, puis russe et arabe), installée sur iPhone depuis Safari. Site statique, hébergé gratuitement sur GitHub Pages : https://ben-shelby.github.io/ponte/

## Règles du projet

- **Zéro coût en plus de l'abonnement Claude Pro** : pas de clé API, pas de service payant, pas d'appel à une IA depuis l'appli.
- L'appli ne doit pas vivre dans le compte Claude (pas d'artifact) : c'est un site indépendant.
- Les contenus sont publics (dépôt public). Aucune donnée personnelle dans `content/`. La progression reste dans le navigateur du téléphone (`localStorage`, clé `ponte.v1`).
- L'utilisateur ne code pas : expliquer simplement, en français, et faire les choses de A à Z.

## Structure

- `index.html`, `css/app.css`, `js/app.js` : l'appli (vanilla JS, aucune dépendance, aucune compilation).
- `js/library.js` : contenus fixes (phrases essentielles, alphabets, sessions d'alphabet cyrillique).
- `content/index.json` : liste des jours et des articles de réserve. `content/days/AAAA-MM-JJ.json` : un article par jour. `content/reserve/` : articles intemporels. `content/config.json` : thèmes, calendrier, signal d'activité.
- `rappels.ics` : deux rappels quotidiens à ajouter au Calendrier de l'iPhone.
- `tools/validate.py` : vérifie les contenus. `tools/make_icons.py` : génère les icônes.
- `design/maquette.html` : la maquette validée.

## Skills du projet

- `.claude/skills/ponte-semaine` : la recette pour préparer et publier une semaine de contenus (utilisée par la routine du dimanche).
- `.claude/skills/ponte-charte` : la charte visuelle et le ton.

## Commandes

- Vérifier les contenus : `py tools/validate.py` (Windows) ou `python3 tools/validate.py`.
- Voir l'appli en local : `py -m http.server 8765`, puis http://localhost:8765
- Publier : pousser sur `main`. GitHub Pages redéploie tout seul.

## Routine

Une routine Claude (cloud) tourne chaque dimanche à 17:00 (heure de Paris) : elle suit le skill `ponte-semaine`, prépare la semaine suivante et pousse sur `main`. Elle s'arrête sans rien générer si l'utilisateur n'a eu aucune activité depuis 14 jours (dès que le signal d'activité est branché dans `content/config.json`).
