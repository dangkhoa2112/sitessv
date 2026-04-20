#!/usr/bin/env python3
"""
Export a Markdown file to PDF using fpdf2 + a Unicode-capable system font (macOS).
Usage: python3 scripts/export-md-pdf.py [input.md] [output.pdf]

Requires: pip install fpdf2
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

from fpdf import FPDF

# macOS — supports Vietnamese + Latin
DEFAULT_FONT = Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf")


def strip_md_inline(s: str) -> str:
    s = re.sub(r"\*\*(.+?)\*\*", r"\1", s)
    s = re.sub(r"`([^`]+)`", r"\1", s)
    return s


def is_table_sep(line: str) -> bool:
    s = line.strip()
    if not (s.startswith("|") and "|" in s):
        return False
    inner = s.strip("|").replace(" ", "")
    return bool(re.match(r"^[\-:|]+$", inner))


class DocPDF(FPDF):
    def __init__(self, font_path: Path):
        super().__init__()
        self.font_path = font_path
        self.set_auto_page_break(auto=True, margin=16)
        self.set_margins(16, 16, 16)

    def setup(self) -> None:
        self.add_font("Body", "", str(self.font_path))
        self.set_font("Body", "", 10)

    def para(self, text: str, size: int = 10, lh: float | None = None) -> None:
        self.set_x(self.l_margin)
        self.set_font("Body", "", size)
        lh = lh or size * 0.5
        usable = self.w - 2 * self.l_margin
        self.multi_cell(usable, lh, text)


def render_markdown(pdf: DocPDF, md_text: str) -> None:
    lines = md_text.splitlines()
    i = 0

    while i < len(lines):
        raw = lines[i]
        line = raw.rstrip()

        # Table block: consecutive lines starting with |
        if line.strip().startswith("|") and len(line.strip()) > 1:
            rows: list[list[str]] = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                row_line = lines[i].strip()
                if is_table_sep(row_line):
                    i += 1
                    continue
                cells = [strip_md_inline(c.strip()) for c in row_line.split("|")[1:-1]]
                if cells:
                    rows.append(cells)
                i += 1
            pdf.ln(2)
            pdf.set_font("Body", "", 8)
            usable_w = pdf.w - 2 * pdf.l_margin
            for row in rows:
                pdf.set_x(pdf.l_margin)
                pdf.multi_cell(usable_w, 4.5, "  |  ".join(row))
            pdf.ln(1)
            continue

        if line.strip() == "---":
            pdf.ln(3)
            i += 1
            continue

        if not line.strip():
            pdf.ln(2)
            i += 1
            continue

        if line.startswith("# "):
            pdf.ln(4)
            pdf.para(strip_md_inline(line[2:]), size=15, lh=6.5)
            pdf.ln(2)
        elif line.startswith("## "):
            pdf.ln(3)
            pdf.para(strip_md_inline(line[3:]), size=12, lh=5.5)
            pdf.ln(1)
        elif line.startswith("### "):
            pdf.ln(2)
            pdf.para(strip_md_inline(line[4:]), size=10.5, lh=5)
            pdf.ln(1)
        elif line.startswith("- "):
            pdf.para("• " + strip_md_inline(line[2:]), size=10, lh=5)
        else:
            pdf.para(strip_md_inline(line), size=10, lh=5)

        i += 1


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    in_path = Path(sys.argv[1]) if len(sys.argv) > 1 else root / "docs" / "technical-requirements.md"
    out_path = Path(sys.argv[2]) if len(sys.argv) > 2 else root / "docs" / "technical-requirements.pdf"

    font = DEFAULT_FONT
    if not font.is_file():
        print("Không tìm thấy font Unicode. Trên macOS cần:", DEFAULT_FONT, file=sys.stderr)
        return 1

    if not in_path.is_file():
        print("Không tìm thấy file:", in_path, file=sys.stderr)
        return 1

    text = in_path.read_text(encoding="utf-8")
    pdf = DocPDF(font)
    pdf.add_page()
    pdf.setup()
    render_markdown(pdf, text)
    pdf.output(str(out_path))
    print(out_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
