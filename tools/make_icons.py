"""Génère les icônes PNG de Ponte (Arco sur fond clair), sans aucune dépendance.

Usage : py tools/make_icons.py
"""
import math
import os
import struct
import zlib

BG = (243, 244, 247)
BODY = (42, 79, 208)
WHITE = (255, 255, 255)
DARK = (21, 23, 28)
CHEEK = (255, 143, 156)


def blend(a, b, t):
    return tuple(round(a[i] * (1 - t) + b[i] * t) for i in range(3))


TILE = blend(BODY, WHITE, 0.6)
SMILE = [((1 - t) ** 2 * 54 + 2 * (1 - t) * t * 60 + t * t * 66,
          (1 - t) ** 2 * 60.5 + 2 * (1 - t) * t * 65.5 + t * t * 60.5)
         for t in (i / 60 for i in range(61))]


def arco_color(x, y):
    """Couleur d'Arco au point (x, y) du repère 0-120 de la mascotte, ou None (fond)."""
    if not (15 <= x <= 105 and 15 <= y <= 109):
        return None
    outer = (18 <= x <= 102 and 60 <= y <= 106) or (y < 60 and (x - 60) ** 2 + (y - 60) ** 2 <= 42 ** 2)
    hole = (44 <= x <= 76 and 84 <= y <= 106) or (y < 84 and (x - 60) ** 2 + (y - 84) ** 2 <= 16 ** 2)
    if not outer or hole:
        return None
    c = BODY
    if y >= 74:
        px, py = x % 11, y % 11
        for cx, cy, r in ((5.5, 2.2, 1.6), (5.5, 8.8, 1.6), (2.2, 5.5, 1.6), (8.8, 5.5, 1.6), (5.5, 5.5, 1.0)):
            if (px - cx) ** 2 + (py - cy) ** 2 <= r * r:
                c = TILE
                break
    for cx in (37, 83):
        if ((x - cx) / 4.5) ** 2 + ((y - 59) / 2.6) ** 2 <= 1:
            c = blend(c, CHEEK, 0.45)
    for ex in (47, 73):
        if ((x - ex) / 7.5) ** 2 + ((y - 49) / 8.5) ** 2 <= 1:
            c = WHITE
            if (x - (ex + 1.5)) ** 2 + (y - 50.5) ** 2 <= 3.8 ** 2:
                c = DARK
            if (x - (ex + 3)) ** 2 + (y - 48.6) ** 2 <= 1.2 ** 2:
                c = WHITE
    if 52 <= x <= 68 and 58 <= y <= 65:
        if min((x - sx) ** 2 + (y - sy) ** 2 for sx, sy in SMILE) <= 1.3 ** 2:
            c = DARK
    return c


def render(size, ss=3):
    scale = size * 0.66 / 88          # Arco mesure 88 unités de haut
    ox = size / 2 - 60 * scale
    oy = size / 2 - 62 * scale
    rows = []
    for py in range(size):
        row = bytearray(b'\x00')      # filtre PNG « aucun »
        for px in range(size):
            acc = [0, 0, 0]
            for sy in range(ss):
                for sx in range(ss):
                    x = (px + (sx + 0.5) / ss - ox) / scale
                    y = (py + (sy + 0.5) / ss - oy) / scale
                    c = arco_color(x, y) or BG
                    acc[0] += c[0]; acc[1] += c[1]; acc[2] += c[2]
            n = ss * ss
            row += bytes((round(acc[0] / n), round(acc[1] / n), round(acc[2] / n), 255))
        rows.append(bytes(row))
    return b''.join(rows)


def write_png(path, size):
    def chunk(tag, data):
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xFFFFFFFF)
    raw = render(size)
    png = (b'\x89PNG\r\n\x1a\n'
           + chunk(b'IHDR', struct.pack('>IIBBBBB', size, size, 8, 6, 0, 0, 0))
           + chunk(b'IDAT', zlib.compress(raw, 9))
           + chunk(b'IEND', b''))
    with open(path, 'wb') as f:
        f.write(png)


if __name__ == '__main__':
    here = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'icons')
    os.makedirs(here, exist_ok=True)
    for s in (180, 192, 512):
        write_png(os.path.join(here, f'icon-{s}.png'), s)
        print('icons/icon-%d.png' % s)
