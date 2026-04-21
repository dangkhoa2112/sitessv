#!/usr/bin/env python3
"""
Build Shinhan-Audit-Deck.pdf: one Chrome print per slide, then merge with pypdf.
Requires: Google Chrome at default macOS path (override with CHROME_PATH).
"""
from __future__ import annotations

import os
import re
import subprocess
import sys
from pathlib import Path

AUDIT = Path(__file__).resolve().parent
ROOT = AUDIT
HTML_SRC = AUDIT / "deck-full-print.html"
OUT_PDF = AUDIT / "Shinhan-Audit-Deck.pdf"
TMP = AUDIT / ".pdf-build"
CHROME = os.environ.get(
    "CHROME_PATH",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
)


def extract_sections(html: str) -> tuple[str, list[str]]:
    """Return (style block inner text, list of section outer HTML)."""
    m = re.search(r"<style>(.*?)</style>", html, re.DOTALL)
    styles = m.group(1) if m else ""
    parts = re.split(r"(?=<section\s+class=\"slide\")", html)
    sections = [p for p in parts if p.strip().startswith("<section")]
    return styles, sections


def write_slide_html(styles: str, section: str, index: int, dest: Path) -> None:
    body = f"""<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <style>
{styles}
    /* single slide: fill one landscape A4 page */
    html, body {{ height: 100%; }}
    body {{ margin: 0; }}
    .slide {{
      min-height: 100vh;
      page-break-after: avoid;
      break-after: avoid;
    }}
  </style>
</head>
<body>
{section}
</body>
</html>
"""
    dest.write_text(body, encoding="utf-8")


def main() -> int:
    if not HTML_SRC.is_file():
        print(f"Missing {HTML_SRC}", file=sys.stderr)
        return 1
    if not Path(CHROME).is_file():
        print(f"Chrome not found at {CHROME}", file=sys.stderr)
        return 1

    html = HTML_SRC.read_text(encoding="utf-8")
    styles, sections = extract_sections(html)
    if not sections:
        print("No sections found", file=sys.stderr)
        return 1

    TMP.mkdir(parents=True, exist_ok=True)
    part_pdfs: list[Path] = []

    for i, sec in enumerate(sections, start=1):
        slide_path = TMP / f"slide-{i:02d}.html"
        pdf_path = TMP / f"slide-{i:02d}.pdf"
        write_slide_html(styles, sec, i, slide_path)
        url = slide_path.as_uri()
        cmd = [
            CHROME,
            "--headless=new",
            "--disable-gpu",
            "--no-pdf-header-footer",
            f"--print-to-pdf={pdf_path}",
            url,
        ]
        subprocess.run(cmd, check=True, capture_output=True, text=True)
        if not pdf_path.is_file():
            print(f"Failed to create {pdf_path}", file=sys.stderr)
            return 1
        part_pdfs.append(pdf_path)

    sys.path.insert(0, str(AUDIT / ".pypdf"))
    from pypdf import PdfReader, PdfWriter  # type: ignore

    writer = PdfWriter()
    for p in part_pdfs:
        reader = PdfReader(str(p))
        # Chrome often emits 2 pages per slide (vh + margins); keep first page only.
        writer.add_page(reader.pages[0])
    with OUT_PDF.open("wb") as f:
        writer.write(f)

    print(f"Wrote {OUT_PDF} ({len(part_pdfs)} pages)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
