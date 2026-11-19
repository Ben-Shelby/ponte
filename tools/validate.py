"""Vérifie les contenus de Ponte avant publication.

Usage : py tools/validate.py        (ou python3 tools/validate.py)
Code de sortie 1 s'il y a une erreur bloquante ; les avertissements n'empêchent pas la publication.
"""
import json
import os
import re
import sys
import unicodedata

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
CONTENT = os.path.join(ROOT, 'content')
MARK = re.compile(r'\[\[([^|\]]+)\|([^\]]+)\]\]')
DATE = re.compile(r'^\d{4}-\d{2}-\d{2}$')

errors, warnings = [], []


def err(where, msg):
    errors.append(f'{where} : {msg}')


def warn(where, msg):
    warnings.append(f'{where} : {msg}')


def norm(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.findall(r'[a-z0-9-]+', s)


def load(path):
    try:
        with open(path, encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:  # noqa: BLE001
        err(os.path.relpath(path, ROOT), f'JSON illisible ({e})')
        return None


def check_article(path, expected_id):
    where = os.path.relpath(path, ROOT).replace('\\', '/')
    a = load(path)
    if a is None:
        return
    for key in ('id', 'lang', 'kind', 'theme', 'level', 'title', 'paragraphs', 'glossary', 'cloze', 'oral'):
        if key not in a:
            err(where, f'champ manquant « {key} »')
    if errors and errors[-1].startswith(where):
        return
    if a['id'] != expected_id:
        err(where, f'id « {a["id"]} » différent du nom de fichier « {expected_id} »')
    if a['kind'] not in ('actu', 'detente'):
        err(where, 'kind doit valoir « actu » ou « detente »')
    if not isinstance(a['title'], dict) or not a['title'].get('pt') or not a['title'].get('fr'):
        err(where, 'title doit avoir pt et fr')
    if a['kind'] == 'actu' and not (a.get('source') or {}).get('url'):
        warn(where, 'article d’actualité sans source')

    gloss = a['glossary']
    used = set()
    words = 0
    sentences = [s for p in a['paragraphs'] for s in p]
    if not sentences:
        err(where, 'aucune phrase')
    for s in sentences:
        if not s.get('pt') or not s.get('fr'):
            err(where, 'chaque phrase doit avoir pt et fr')
            continue
        for _, key in MARK.findall(s['pt']):
            used.add(key)
            if key not in gloss:
                err(where, f'mot balisé « {key} » absent du glossaire')
        words += len(MARK.sub(r'\1', s['pt']).split())
    if not 40 <= words <= 120:
        warn(where, f'{words} mots (cible : 50 à 90)')
    for key, g in gloss.items():
        if not g.get('w') or not g.get('fr'):
            err(where, f'glossaire « {key} » : w et fr obligatoires')
        if key not in used:
            warn(where, f'glossaire « {key} » jamais utilisé dans le texte')
    n_new = sum(1 for g in gloss.values() if g.get('new'))
    if not 4 <= n_new <= 8:
        warn(where, f'{n_new} mots nouveaux (cible : 5 à 7)')

    if len(a['cloze']) != 3:
        err(where, 'il faut exactement 3 textes à trous')
    for i, c in enumerate(a['cloze'], 1):
        opts = c.get('options') or []
        if c.get('answer') not in opts:
            err(where, f'trou {i} : la réponse doit figurer dans les options')
        if len(opts) != 3 or len(set(opts)) != 3:
            err(where, f'trou {i} : 3 options différentes attendues')
        if not c.get('why') or 'before' not in c or 'after' not in c:
            err(where, f'trou {i} : before, after et why obligatoires')

    o = a['oral']
    for key in ('question', 'starter', 'model', 'keywords', 'tip'):
        if key not in o:
            err(where, f'oral : champ manquant « {key} »')
    if 'model' in o and 'keywords' in o:
        model = set(norm(o['model'].get('pt', '')))
        for k in o['keywords']:
            if not set(norm(k)) <= model:
                err(where, f'oral : le mot clé « {k} » n’est pas dans la réponse modèle')


def main():
    index = load(os.path.join(CONTENT, 'index.json'))
    load(os.path.join(CONTENT, 'config.json'))
    if index is None:
        return
    seen = set()
    for d in index.get('days', []):
        where = f'index.json ({d.get("id")})'
        if not DATE.match(d.get('id', '')):
            err(where, 'id doit être une date AAAA-MM-JJ')
        if d.get('id') in seen:
            err(where, 'jour en double')
        seen.add(d.get('id'))
        if not (d.get('title') or {}).get('pt'):
            err(where, 'title.pt manquant')
        path = os.path.join(CONTENT, 'days', f'{d.get("id")}.json')
        if not os.path.exists(path):
            err(where, 'fichier du jour introuvable')
        else:
            check_article(path, d['id'])
    ids = [d.get('id') for d in index.get('days', [])]
    if ids != sorted(ids):
        err('index.json', 'les jours doivent être triés par date')
    for r in index.get('reserve', []):
        path = os.path.join(CONTENT, 'reserve', f'{r.get("id")}.json')
        if not os.path.exists(path):
            err(f'index.json ({r.get("id")})', 'fichier de réserve introuvable')
        else:
            check_article(path, r['id'])

    for w in warnings:
        print('Avertissement :', w)
    for e in errors:
        print('ERREUR :', e)
    print(f'{len(ids)} jours, {len(index.get("reserve", []))} articles de réserve, '
          f'{len(errors)} erreur(s), {len(warnings)} avertissement(s).')
    sys.exit(1 if errors else 0)


if __name__ == '__main__':
    main()
