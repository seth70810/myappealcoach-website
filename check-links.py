#!/usr/bin/env python3
"""Checks every external link in the site. Run locally:  python3 check-links.py"""
import re, glob, urllib.request, ssl, collections

urls = collections.defaultdict(set)
for f in sorted(glob.glob("*.html")):
    s = open(f, encoding="utf-8").read()
    for u in re.findall(r'(?:href|src|action)="(https?://[^"]+)"', s):
        urls[u].add(f)

ctx = ssl.create_default_context()
hdr = {"User-Agent": "Mozilla/5.0 (link-check)"}
bad = []
for u in sorted(urls):
    try:
        req = urllib.request.Request(u, headers=hdr, method="HEAD")
        code = urllib.request.urlopen(req, timeout=15, context=ctx).status
        if code >= 400: raise Exception(code)
        print(f"  OK  {code}  {u}")
    except Exception as e:
        print(f"  !!  {e}  {u}   <- {', '.join(sorted(urls[u]))}")
        bad.append(u)
print(f"\n{len(urls)} links checked, {len(bad)} need attention.")
