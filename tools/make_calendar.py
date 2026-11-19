"""Génère content/rappels.ics : le calendrier auquel l'iPhone est abonné.

Un rappel le matin (avec le titre de l'article) et un rappel le soir, uniquement pour les jours
qui ont un article dans content/index.json. Si la routine se met en pause faute d'activité,
aucun nouveau jour n'est ajouté : les rappels s'arrêtent d'eux-mêmes après le dernier jour préparé.

Usage : python3 tools/make_calendar.py   (sous Windows : py tools/make_calendar.py)
"""
import datetime
import json
import os

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
SITE = 'https://ben-shelby.github.io/ponte/'
KEEP_PAST_DAYS = 7


def esc(text):
    return (text.replace('\\', '\\\\').replace(';', '\\;').replace(',', '\\,').replace('\n', '\\n'))


def fold(line):
    """Coupe les lignes à 75 octets, comme le demande la norme iCalendar."""
    out, cur = [], ''
    for ch in line:
        limit = 75 if not out else 74
        if len((cur + ch).encode('utf-8')) > limit:
            out.append(cur)
            cur = ch
        else:
            cur += ch
    out.append(cur)
    return '\r\n '.join(out)


def event(uid, start, summary, description, stamp):
    return [
        'BEGIN:VEVENT',
        f'UID:{uid}@ben-shelby.github.io',
        f'DTSTAMP:{stamp}',
        f'DTSTART:{start}',
        'DURATION:PT5M',
        f'SUMMARY:{esc(summary)}',
        f'DESCRIPTION:{esc(description)}',
        f'URL:{SITE}',
        'BEGIN:VALARM',
        'ACTION:DISPLAY',
        f'DESCRIPTION:{esc(summary)}',
        'TRIGGER:PT0M',
        'END:VALARM',
        'END:VEVENT',
    ]


def build(today=None):
    today = today or datetime.date.today()
    with open(os.path.join(ROOT, 'content', 'index.json'), encoding='utf-8') as f:
        index = json.load(f)
    stamp = index.get('updated', today.isoformat()).replace('-', '') + 'T000000Z'
    lines = [
        'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Ponte//Rappels//FR', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
        'X-WR-CALNAME:Ponte', 'X-WR-CALDESC:Tes rappels Ponte. Ils s’arrêtent tout seuls si tu ne fais plus de séances.',
        'REFRESH-INTERVAL;VALUE=DURATION:PT6H', 'X-PUBLISHED-TTL:PT6H',
    ]
    for day in index.get('days', []):
        date = datetime.date.fromisoformat(day['id'])
        if date < today - datetime.timedelta(days=KEEP_PAST_DAYS):
            continue
        ymd = day['id'].replace('-', '')
        title = day.get('title', {})
        lines += event(f'ponte-{day["id"]}-m', f'{ymd}T080000', f'Ponte · {title.get("pt", "lecture du matin")}',
                       f'Lecture du matin, 4 minutes : {title.get("fr", "")}\n{SITE}', stamp)
        lines += event(f'ponte-{day["id"]}-e', f'{ymd}T183000', 'Ponte · défi oral',
                       f'2 minutes : une question sur l’article du matin.\n{SITE}', stamp)
    lines.append('END:VCALENDAR')
    return '\r\n'.join(fold(l) for l in lines) + '\r\n'


if __name__ == '__main__':
    path = os.path.join(ROOT, 'content', 'rappels.ics')
    with open(path, 'w', encoding='utf-8', newline='') as f:
        f.write(build())
    print('content/rappels.ics mis à jour')
