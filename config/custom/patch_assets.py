#!/usr/bin/env python3
"""Patch Coursify branding into the copied dist-client tree on GreenCloud."""
import os, re

ROOT = "/opt/hievents/custom/dist-client"
ASSETS = os.path.join(ROOT, "assets")

replacements = [
    # compiled JS bundles
    ("Dublin Jazz Festival", "AI For Workplace"),
    ("Sat, Aug 16 \u00b7 8:00 PM \u00b7 Dublin", "Live Online \u00b7 Malaysia"),
    ("Sell out your event.", "Sell out your course."),
    ("Try Hi.Events Free", "Try Coursify Free"),
    ("sell tickets online with Hi.Events", "sell tickets online with Coursify"),
]

patched = []
for fname in os.listdir(ASSETS):
    if not fname.endswith((".js", ".css")):
        continue
    path = os.path.join(ASSETS, fname)
    with open(path, "rb") as f:
        data = f.read()
    orig = data
    for old, new in replacements:
        data = data.replace(old.encode(), new.encode())
    if data != orig:
        with open(path, "wb") as f:
            f.write(data)
        patched.append(fname)

# index.html: title + theme colour
p = os.path.join(ROOT, "index.html")
with open(p) as f:
    html = f.read()
html = html.replace("<title>Hi.Events</title>", "<title>Coursify</title>")
html = html.replace('content="#cd58dd"', 'content="#7C3AED"')
with open(p, "w") as f:
    f.write(html)
patched.append("index.html")

# site.webmanifest
p = os.path.join(ROOT, "site.webmanifest")
with open(p) as f:
    wm = f.read()
wm = wm.replace('"name": "Hi.Events"', '"name": "Coursify"')
wm = wm.replace('"short_name": "Hi.Events"', '"short_name": "Coursify"')
wm = wm.replace('"theme_color": "#cd58dd"', '"theme_color": "#7C3AED"')
with open(p, "w") as f:
    f.write(wm)
patched.append("site.webmanifest")

print("patched:", ", ".join(sorted(patched)))
