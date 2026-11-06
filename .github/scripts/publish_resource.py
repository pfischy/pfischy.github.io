#!/usr/bin/env python3
"""Publish a FISCH resource from a GitHub Issue Form (repo owner only)."""
import json, os, re, sys
from pathlib import Path
body = os.environ.get("ISSUE_BODY", "")
fields = {}
for match in re.finditer(r"^### (.+?)\s*\n(.*?)(?=^### |\Z)", body, re.M | re.S):
    fields[match.group(1).strip().lower()] = match.group(2).strip()
title = fields.get("resource title", "").strip()
kind = fields.get("format", "").strip()
description = re.sub(r"\s+", " ", fields.get("description", "")).strip()
url = fields.get("public link", "").strip()
if not title or not description or not kind or len(title)>120 or len(description)>320 or len(url)>500:
    sys.exit("Missing or excessively long content")
if not (url.startswith("/") and not url.startswith("//") and ".." not in url or re.fullmatch(r"https://[a-zA-Z0-9._~:/?#\[\]@!$&'()*+,;=%-]+",url)):
    sys.exit("Invalid public URL")
path=Path("content/resources.json")
items=json.loads(path.read_text())
items=[r for r in items if r.get("url")!=url]
items.insert(0,{"title":title,"type":kind,"description":description,"url":url,"status":"published"})
path.write_text(json.dumps(items,indent=2,ensure_ascii=False)+"\n")
print(f"Updated {path} with {title!r}")
