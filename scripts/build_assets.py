"""Builds every SVG graphic used by the profile README (light, muted Papamoa beach theme).

Run from the repo root:   python3 scripts/build_assets.py
Needs a GitHub token for the activity graph: GITHUB_TOKEN / GH_TOKEN, or a logged-in `gh` CLI.
A GitHub Action runs this daily so the activity graph stays current.
"""
import datetime as dt
import json
import os
import subprocess
import urllib.request
from html import escape
from pathlib import Path

USER = "robwynyard"
OUT = Path(__file__).resolve().parent.parent / "assets"
OUT.mkdir(parents=True, exist_ok=True)

SANS = "'Segoe UI', Inter, -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif"
MONO = "'SFMono-Regular', Menlo, Consolas, 'Liberation Mono', monospace"

# ---------------------------------------------------------------- palette
SHELL = "#FBF8F2"     # card background, bleached shell
SAND = "#F4ECDD"      # dry sand
SAND_DEEP = "#E9DCC4"
BORDER = "#E3D7C3"
INK = "#2E4048"       # deep sea slate (body text)
MUTED = "#6B7C83"


class C:  # accent = (soft fill, deep text-safe tone)
    TIDE = ("#9CC2BF", "#3F6E71")
    SKY = ("#B3CAD6", "#4A7189")
    CORAL = ("#E6B19D", "#A35E4A")
    POHU = ("#D9938A", "#9E4A42")
    KELP = ("#B2C3A2", "#5A714F")
    DUNE = ("#E6CF9F", "#866533")


def write(name, svg):
    (OUT / name).write_text(svg.strip() + "\n", encoding="utf-8")
    print("wrote", name)


def wave_path(width, period, amp, y, bottom):
    d, x, q = f"M0 {y}", 0, period / 4
    while x < width:
        d += f" Q{x + q} {y - amp} {x + 2 * q} {y} T{x + period} {y}"
        x += period
    return d + f" L{width} {bottom} L0 {bottom} Z"


def frame(W, H, body, label, bg=SHELL, extra_defs=""):
    return f"""
<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-label="{escape(label)}">
  <defs><clipPath id="fr"><rect width="{W}" height="{H}" rx="22"/></clipPath>{extra_defs}</defs>
  <g clip-path="url(#fr)" font-family="{SANS}">
    <rect width="{W}" height="{H}" fill="{bg}"/>
    {body}
  </g>
  <rect x=".5" y=".5" width="{W - 1}" height="{H - 1}" rx="22" fill="none" stroke="{BORDER}"/>
</svg>"""


# ---------------------------------------------------------------- header
def header():
    W, H = 1200, 360
    horizon, beach = 232, 300
    phrases = [
        "Building agentic AI that cites its sources.",
        "Shipping Next.js + FastAPI platforms end to end.",
        "Turning messy knowledge into governed answers.",
        "Designing for humans first, models second.",
    ]
    cycle, char_w, tx, ty = 16.0, 21 * 0.6, 82, 206
    slot = cycle / len(phrases)
    typing = []
    for i, p in enumerate(phrases):
        full = len(p) * char_w + 4
        s = i * slot / cycle
        typed, hold, end = s + slot * .45 / cycle, s + slot * .92 / cycle, s + slot / cycle
        pts = []
        for t, v in [(0, 0), (s, 0), (typed, full), (hold, full), (end, 0), (1, 0)]:
            if not pts or abs(pts[-1][0] - t) > 1e-9:
                pts.append((t, v))
        kts = ";".join(f"{t:.4f}" for t, _ in pts)
        okt = [0.0] + ([s] if s > 0 else []) + ([end] if end < 1 else [])
        ov = ["1" if s == 0 else "0"] + (["1"] if s > 0 else []) + (["0"] if end < 1 else [])
        typing.append(f"""
    <clipPath id="c{i}"><rect x="{tx}" y="{ty - 24}" height="34" width="0">
      <animate attributeName="width" dur="{cycle}s" repeatCount="indefinite" keyTimes="{kts}" values="{';'.join(f'{v:.1f}' for _, v in pts)}"/></rect></clipPath>
    <g clip-path="url(#c{i})"><text x="{tx}" y="{ty}" font-family="{MONO}" font-size="21" font-weight="500" fill="{INK}">{escape(p)}</text></g>
    <rect y="{ty - 19}" width="10" height="24" rx="2" fill="{C.POHU[1]}" opacity="0">
      <animate attributeName="x" dur="{cycle}s" repeatCount="indefinite" keyTimes="{kts}" values="{';'.join(f'{tx + v:.1f}' for _, v in pts)}"/>
      <animate attributeName="opacity" dur="{cycle}s" repeatCount="indefinite" keyTimes="{';'.join(f'{t:.4f}' for t in okt)}" values="{';'.join(ov)}" calcMode="discrete"/></rect>""")

    sx, sy = 1060, horizon - 22
    shimmer = "".join(
        f'<rect x="{sx - (64 - k * 7) / 2}" y="{horizon + 8 + k * 8}" width="{64 - k * 7}" height="2.4" rx="1.2" fill="#FFFFFF">'
        f'<animate attributeName="opacity" values=".25;.9;.25" dur="{1.8 + k * .3:.1f}s" begin="{k * .2:.1f}s" repeatCount="indefinite"/></rect>'
        for k in range(7))
    gulls = ""
    for gy, dur, delay, sc in [(92, 24, 0, 1), (120, 30, 8, .75), (70, 36, 16, .6)]:
        a = f"M{-12 * sc} 0 Q{-6 * sc} {-7 * sc} 0 0 Q{6 * sc} {-7 * sc} {12 * sc} 0"
        b = f"M{-12 * sc} {-3 * sc} Q{-6 * sc} {2 * sc} 0 0 Q{6 * sc} {2 * sc} {12 * sc} {-3 * sc}"
        gulls += (f'<g><animateTransform attributeName="transform" type="translate" values="560 {gy};1240 {gy - 26}" dur="{dur}s" begin="-{delay}s" repeatCount="indefinite"/>'
                  f'<path d="{a}" fill="none" stroke="#5E6F76" stroke-width="2" stroke-linecap="round"><animate attributeName="d" values="{a};{b};{a}" dur="1.2s" repeatCount="indefinite"/></path></g>')
    clouds = "".join(
        f'<g opacity=".8"><animateTransform attributeName="transform" type="translate" values="{x0} {cy};{x0 + 90} {cy};{x0} {cy}" dur="{d}s" repeatCount="indefinite"/>'
        f'<ellipse cx="0" cy="0" rx="{rx}" ry="{rx * .28:.0f}" fill="#FFFFFF"/><ellipse cx="{rx * .3:.0f}" cy="{-rx * .18:.0f}" rx="{rx * .5:.0f}" ry="{rx * .25:.0f}" fill="#FFFFFF"/></g>'
        for x0, cy, rx, d in [(640, 60, 70, 40), (900, 40, 52, 48), (760, 130, 40, 34)])
    foam1 = wave_path(2400, 200, 7, beach, H)
    foam2 = wave_path(2400, 260, 6, beach + 10, H)
    body = f"""
    <rect width="{W}" height="{H}" fill="url(#sky)"/>
    {clouds}
    <circle cx="{sx}" cy="{sy}" r="110" fill="url(#glow)"><animate attributeName="r" values="100;122;100" dur="7s" repeatCount="indefinite"/></circle>
    <circle cx="{sx}" cy="{sy}" r="44" fill="#F4D3B2"/>
    <path d="M760 {horizon} C800 {horizon - 8} 815 {horizon - 28} 850 {horizon - 48} C880 {horizon - 66} 902 {horizon - 104} 940 {horizon - 108}
      C975 {horizon - 112} 1000 {horizon - 86} 1018 {horizon - 62} C1036 {horizon - 38} 1070 {horizon - 12} 1120 {horizon} Z" fill="#9FB0B6"/>
    <path d="M700 {horizon} C712 {horizon - 13} 736 {horizon - 15} 750 {horizon} Z" fill="#9FB0B6"/>
    <rect y="{horizon}" width="{W}" height="{beach - horizon + 20}" fill="url(#sea)"/>
    {shimmer}
    {gulls}
    <rect y="{beach}" width="{W}" height="{H - beach}" fill="{SAND}"/>
    <path d="{foam2}" fill="#DCE9E6"><animateTransform attributeName="transform" type="translate" values="0 -6;-260 2;-520 -6" dur="11s" repeatCount="indefinite"/></path>
    <path d="{foam1}" fill="#FFFFFF" opacity=".85"><animateTransform attributeName="transform" type="translate" values="-200 -4;0 6;200 -4" dur="8s" repeatCount="indefinite" additive="replace"/></path>
    <path d="{wave_path(2400, 200, 7, beach + 26, H)}" fill="{SAND}"><animateTransform attributeName="transform" type="translate" values="0 0;-200 0" dur="8s" repeatCount="indefinite"/></path>
    <rect width="{W}" height="{H}" fill="url(#veil)"/>
    <rect x="82" y="44" width="300" height="32" rx="16" fill="#FFFFFF" fill-opacity=".7" stroke="{C.TIDE[0]}"/>
    <circle cx="102" cy="60" r="5" fill="{C.KELP[1]}"><animate attributeName="opacity" values="1;.3;1" dur="1.8s" repeatCount="indefinite"/></circle>
    <text x="116" y="65" font-size="14" font-weight="700" letter-spacing="2" fill="{C.TIDE[1]}">AI / FULL STACK ENGINEER</text>
    <text x="78" y="138" font-size="72" font-weight="800" letter-spacing="-1" fill="url(#name)">Rob Wynyard</text>
    <text x="82" y="172" font-size="19" fill="{MUTED}">@ <tspan fill="{INK}" font-weight="700">Seen Ventures</tspan>  ·  Papamoa, Aotearoa New Zealand</text>
    <text x="{tx - 4}" y="{ty}" font-family="{MONO}" font-size="21" fill="{C.POHU[1]}" text-anchor="end">›</text>
    {''.join(typing)}"""
    defs = f"""
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D6E5EA"/><stop offset=".45" stop-color="#EAE9E1"/><stop offset=".65" stop-color="#F5E0CC"/></linearGradient>
    <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A9C7C8"/><stop offset="1" stop-color="#C6DCD9"/></linearGradient>
    <radialGradient id="glow"><stop offset="0" stop-color="#F3C4A2" stop-opacity=".7"/><stop offset="1" stop-color="#F3C4A2" stop-opacity="0"/></radialGradient>
    <linearGradient id="veil" x1="0" x2="1"><stop offset="0" stop-color="#F7F2EA" stop-opacity=".55"/><stop offset=".5" stop-color="#F7F2EA" stop-opacity="0"/></linearGradient>
    <linearGradient id="name" x1="0" x2="1"><stop offset="0" stop-color="{C.TIDE[1]}"/><stop offset=".55" stop-color="{INK}"/><stop offset="1" stop-color="{C.POHU[1]}"/>
      <animateTransform attributeName="gradientTransform" type="translate" values="-.2 0;.2 0;-.2 0" dur="10s" repeatCount="indefinite"/></linearGradient>"""
    return frame(W, H, body, "Rob Wynyard, AI / Full Stack Engineer at Seen Ventures, Papamoa", bg="#EAE9E1", extra_defs=defs)


# ---------------------------------------------------------------- headings
def heading(fname, text, acc):
    W, H = 1200, 64
    tw = len(text) * 16.2
    body = f"""
    <g transform="translate(26 32)">
      <circle r="15" fill="{acc[0]}" fill-opacity=".45"/>
      <path d="M-9 2 Q-4.5 -4 0 2 T9 2" fill="none" stroke="{acc[1]}" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M-9 -4 Q-4.5 -10 0 -4 T9 -4" fill="none" stroke="{acc[1]}" stroke-width="2.4" stroke-linecap="round" opacity=".5"/>
    </g>
    <text x="54" y="41" font-size="26" font-weight="800" fill="{INK}">{text}</text>
    <path d="{wave_path(3000, 40, 3, 33, 33).split(' L')[0]}" transform="translate({54 + tw + 22} 0)" fill="none" stroke="{acc[0]}" stroke-width="2.5">
      <animateTransform attributeName="transform" type="translate" values="{54 + tw + 22} 0;{54 + tw - 18} 0" dur="3s" repeatCount="indefinite"/></path>
    <rect x="{W - 24}" width="24" height="{H}" fill="{SHELL}"/>"""
    write(fname, frame(W, H, body, text.replace("&amp;", "&")))


# ---------------------------------------------------------------- role card
def role():
    W, H = 1200, 320
    cols = [
        (C.TIDE, "Agentic AI", ["RAG pipelines with citations", "Human approval before answers ship", "PII gates &amp; tiered access", "AI chat inside real products"]),
        (C.SKY, "Full Stack Product", ["Next.js / React + TypeScript", "FastAPI services in Python", "Postgres, Supabase, Redis", "Strapi &amp; Sanity CMS"]),
        (C.CORAL, "Product &amp; Delivery", ["BRD → MVP in focused sprints", "Admin portals teams run daily", "Role-based access &amp; audit logs", "Mentoring AI &amp; dev cohorts"]),
    ]
    parts = []
    for i, (acc, title, items) in enumerate(cols):
        x = 50 + i * 376
        lis = "".join(f'<circle cx="{x + 30}" cy="{180 + j * 29}" r="4.5" fill="{acc[0]}"/><text x="{x + 46}" y="{185 + j * 29}" font-size="16" fill="{INK}">{t}</text>' for j, t in enumerate(items))
        parts.append(f"""
    <rect x="{x}" y="104" width="348" height="190" rx="18" fill="#FFFFFF" stroke="{BORDER}"/>
    <path d="{wave_path(348, 58, 4, 8, 0)}" transform="translate({x} 104)" fill="{acc[0]}" opacity=".55"/>
    <rect x="{x}" y="104" width="348" height="8" fill="{acc[0]}" opacity=".55"/>
    <text x="{x + 26}" y="148" font-size="20" font-weight="800" fill="{acc[1]}">{title}</text>{lis}""")
    body = f"""
    <text x="52" y="52" font-size="13" font-weight="700" letter-spacing="3" fill="{MUTED}">NOW · 2025 – PRESENT</text>
    <text x="52" y="84" font-size="28" font-weight="800" fill="{INK}">AI / Full Stack Engineer at <tspan fill="{C.TIDE[1]}">Seen Ventures</tspan></text>
    {''.join(parts)}"""
    return frame(W, H, body, "What I do at Seen Ventures", bg=SAND)


# ---------------------------------------------------------------- project cards
def icon(kind, x, y, c):
    if kind == "compass":
        return f'<circle cx="{x}" cy="{y}" r="17" fill="none" stroke="{c}" stroke-width="2.6"/><path d="M{x} {y-11} L{x+5} {y} L{x} {y+11} L{x-5} {y} Z" fill="{c}"><animateTransform attributeName="transform" type="rotate" values="0 {x} {y};25 {x} {y};-15 {x} {y};0 {x} {y}" dur="6s" repeatCount="indefinite"/></path>'
    if kind == "bolt":
        return f'<path d="M{x+4} {y-19} L{x-10} {y+3} L{x} {y+3} L{x-4} {y+19} L{x+10} {y-3} L{x} {y-3} Z" fill="{c}"><animate attributeName="opacity" values="1;.45;1" dur="2.2s" repeatCount="indefinite"/></path>'
    if kind == "shield":
        return f'<path d="M{x} {y-19} L{x+15} {y-12} L{x+15} {y+1} Q{x+15} {y+14} {x} {y+20} Q{x-15} {y+14} {x-15} {y+1} L{x-15} {y-12} Z" fill="none" stroke="{c}" stroke-width="2.6"/><path d="M{x-7} {y} L{x-2} {y+6} L{x+8} {y-6}" fill="none" stroke="{c}" stroke-width="2.6" stroke-linecap="round"/>'
    if kind == "leaf":
        return f'<path d="M{x-15} {y+15} Q{x-17} {y-17} {x+17} {y-17} Q{x+17} {y+15} {x-15} {y+15} Z" fill="{c}"/><path d="M{x-13} {y+13} L{x+7} {y-7}" stroke="{SHELL}" stroke-width="2.2"/>'
    if kind == "hardhat":
        return f'<path d="M{x-17} {y+7} Q{x-17} {y-15} {x} {y-15} Q{x+17} {y-15} {x+17} {y+7} Z" fill="{c}"/><rect x="{x-21}" y="{y+5}" width="42" height="7" rx="3" fill="{c}"/><rect x="{x-3}" y="{y-17}" width="6" height="13" rx="2" fill="{SHELL}"/>'
    if kind == "grid":
        return "".join(f'<rect x="{x-18+(k%3)*13}" y="{y-18+(k//3)*13}" width="10" height="10" rx="2.5" fill="{c}"><animate attributeName="opacity" values="1;.3;1" dur="3s" begin="{k*.25}s" repeatCount="indefinite"/></rect>' for k in range(9))
    if kind == "book":
        return (f'<path d="M{x} {y-11} Q{x-10} {y-17} {x-20} {y-13} L{x-20} {y+14} Q{x-10} {y+10} {x} {y+16} Q{x+10} {y+10} {x+20} {y+14} L{x+20} {y-13} Q{x+10} {y-17} {x} {y-11} Z" fill="none" stroke="{c}" stroke-width="2.6" stroke-linejoin="round"/>'
                f'<line x1="{x}" y1="{y-11}" x2="{x}" y2="{y+16}" stroke="{c}" stroke-width="2.4"/>'
                f'<path d="M{x+4} {y-4} L{x+15} {y-6} M{x+4} {y+3} L{x+15} {y+2}" stroke="{c}" stroke-width="2" stroke-linecap="round"><animate attributeName="opacity" values="1;.3;1" dur="2.4s" repeatCount="indefinite"/></path>')
    if kind == "spray":
        mist = "".join(f'<circle cx="{x+9+dx}" cy="{y-15+dy}" r="1.8" fill="{c}"><animate attributeName="opacity" values="0;1;0" dur="1.6s" begin="{k*.2:.1f}s" repeatCount="indefinite"/></circle>' for k, (dx, dy) in enumerate([(4, 0), (9, -4), (9, 3), (14, -1), (14, -7), (14, 6)]))
        return f'<rect x="{x-9}" y="{y-5}" width="16" height="25" rx="4" fill="{c}"/><rect x="{x-6}" y="{y-12}" width="10" height="7" rx="2" fill="{c}"/><rect x="{x+3}" y="{y-16}" width="6" height="4" rx="1" fill="{c}"/>{mist}'
    if kind == "camera":
        return (f'<rect x="{x-19}" y="{y-10}" width="38" height="26" rx="6" fill="none" stroke="{c}" stroke-width="2.6"/><path d="M{x-7} {y-10} L{x-4} {y-16} L{x+4} {y-16} L{x+7} {y-10}" fill="none" stroke="{c}" stroke-width="2.6" stroke-linejoin="round"/>'
                f'<circle cx="{x}" cy="{y+3}" r="7" fill="none" stroke="{c}" stroke-width="2.6"/><circle cx="{x+13}" cy="{y-4}" r="2" fill="{c}"><animate attributeName="opacity" values="0;1;0;0" keyTimes="0;.1;.2;1" dur="3s" repeatCount="indefinite"/></circle>')
    if kind == "coin":
        return (f'<ellipse cx="{x}" cy="{y+12}" rx="16" ry="5" fill="{c}" opacity=".45"/><ellipse cx="{x}" cy="{y+6}" rx="16" ry="5" fill="{c}" opacity=".7"/>'
                f'<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="2s" repeatCount="indefinite"/><circle cx="{x}" cy="{y-6}" r="13" fill="{c}"/>'
                f'<text x="{x}" y="{y-1}" font-size="15" font-weight="800" fill="{SHELL}" text-anchor="middle">$</text></g>')
    return ""


def card(fname, acc, kind, kicker, title, tagline, bullets, chips):
    W, H = 580, 330
    soft, deep = acc
    tl = "".join(f'<tspan x="32" dy="{0 if j == 0 else 22}">{t}</tspan>' for j, t in enumerate(tagline))
    bl = "".join(f'<path d="M34 {174 + j*28} l6 6 l10 -11" fill="none" stroke="{deep}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><text x="60" y="{184 + j*28}" font-size="15.5" fill="{INK}">{b}</text>' for j, b in enumerate(bullets))
    chip_svg, cx = [], 32
    for ch in chips:
        w = int(len(ch.replace("&amp;", "&")) * 7.6 + 24)
        chip_svg.append(f'<rect x="{cx}" y="262" width="{w}" height="28" rx="14" fill="{soft}" fill-opacity=".35"/><text x="{cx + w/2}" y="281" font-size="13" font-weight="700" fill="{deep}" text-anchor="middle">{ch}</text>')
        cx += w + 8
    body = f"""
    <circle cx="560" cy="0" r="170" fill="{soft}" opacity=".18"/>
    <circle cx="522" cy="56" r="32" fill="{soft}" fill-opacity=".4"/>
    {icon(kind, 522, 56, deep)}
    <text x="32" y="46" font-size="12" font-weight="800" letter-spacing="2.5" fill="{deep}">{kicker}</text>
    <text x="32" y="80" font-size="25" font-weight="800" fill="{INK}">{title}</text>
    <text y="110" font-size="15.5" fill="{MUTED}">{tl}</text>
    {bl}{''.join(chip_svg)}
    <path d="{wave_path(1160, 145, 5, 312, H)}" fill="{soft}" opacity=".5"><animateTransform attributeName="transform" type="translate" values="0 0;-145 0" dur="6s" repeatCount="indefinite"/></path>
    <path d="{wave_path(1160, 116, 4, 320, H)}" fill="{soft}" opacity=".8"><animateTransform attributeName="transform" type="translate" values="-116 0;0 0" dur="5s" repeatCount="indefinite"/></path>"""
    write(fname, frame(W, H, body, title.replace("&amp;", "&")))


PROJECTS = [
    ("project-utility-ai.svg", C.TIDE, "bolt", "AI · UTILITIES", "Workforce Knowledge AI",
     ["Captures what retiring experts know and serves", "it to workers in the field, safely."],
     ["Knowledge checked against safety documents", "Every answer points to where it came from", "Nothing reaches a worker until a human approves"],
     ["Python", "FastAPI", "RAG", "React"]),
    ("project-kt-blueprint.svg", C.KELP, "shield", "GOVERNED RAG", "Knowledge Transfer Blueprint",
     ["A reusable blueprint for governed AI answers,", "stood up again from configuration alone."],
     ["PII gate: no personal identifier gets indexed", "Access tiers enforced before retrieval", "Honest refusals: “not known” vs “not permitted”"],
     ["TypeScript", "Python", "LLMs", "Governance"]),
    ("project-reo.svg", C.DUNE, "book", "EDTECH · TE REO MĀORI", "Te Reo Learning Platform",
     ["Immersive te reo Māori learning for rangatahi", "aged 13 to 25."],
     ["Structured courses with streamed video lessons", "AI chat practice and progress tracking", "Gamified rewards with cross-credit"],
     ["Next.js", "Strapi", "FastAPI", "Redis"]),
    ("project-graffiti-web.svg", C.SKY, "spray", "SERVICE BUSINESS", "Graffiti Removal Platform",
     ["Website and admin dashboard for a graffiti", "removal company."],
     ["Drag-and-drop page builder with rich text", "Built-in website analytics dashboard", "Transactional email notifications"],
     ["Next.js", "Supabase", "Sanity", "Strapi"]),
    ("project-graffiti-ops.svg", C.POHU, "camera", "FIELD OPERATIONS", "Graffiti Response Portal",
     ["Public site and admin portal a removal crew", "uses to run the business day to day."],
     ["Reports inbox and before/after evidence cases", "Photo metadata read straight from uploads", "Role-based access with a full audit log"],
     ["Next.js", "Sanity", "Supabase", "Claude"]),
    ("project-tax.svg", C.CORAL, "coin", "FINTECH · OWN PRODUCT", "Small Business Tax App",
     ["Tax, GST and cashflow for New Zealand sole", "traders and small businesses."],
     ["Bank feed arrives already coded", "GST set aside as you go", "Built and hosted in NZ, launching 2027"],
     ["TypeScript", "Next.js", "Design system"]),
]


# ---------------------------------------------------------------- mentoring
MENTORING = [
    (C.TIDE, "people", "BAY OF PLENTY AI ACCELERATOR", "Mentor &amp; trainer",
     ["Mentored founders and teams through the", "accelerator and ran hands-on training on", "agentic AI: tool-using agents, multi-agent", "handovers, and when not to use them."],
     "“Agents are a tool, not the goal. Start simple.”"),
    (C.CORAL, "rocket", "MISSION READY HQ", "Cohort mentor",
     ["Mentoring cohorts of new developers on", "the same programme that got me into", "software: code reviews, team projects,", "Git habits and shipping real products."],
     "Paying it forward, one cohort at a time."),
]


def mentor_icon(kind, x, y, c):
    if kind == "people":
        return (f'<circle cx="{x-9}" cy="{y-7}" r="7" fill="{c}"/><path d="M{x-22} {y+16} Q{x-22} {y+2} {x-9} {y+2} Q{x+4} {y+2} {x+4} {y+16} Z" fill="{c}"/>'
                f'<circle cx="{x+11}" cy="{y-4}" r="6" fill="{c}" opacity=".6"/><path d="M{x+1} {y+16} Q{x+1} {y+4} {x+11} {y+4} Q{x+22} {y+4} {x+22} {y+16} Z" fill="{c}" opacity=".6"/>')
    return (f'<g><animateTransform attributeName="transform" type="translate" values="0 2;0 -3;0 2" dur="2.4s" repeatCount="indefinite"/>'
            f'<path d="M{x} {y-20} Q{x+11} {y-8} {x+8} {y+8} L{x-8} {y+8} Q{x-11} {y-8} {x} {y-20} Z" fill="{c}"/><circle cx="{x}" cy="{y-5}" r="3.5" fill="{SHELL}"/>'
            f'<path d="M{x-8} {y+2} L{x-14} {y+10} L{x-8} {y+8} Z M{x+8} {y+2} L{x+14} {y+10} L{x+8} {y+8} Z" fill="{c}"/></g>'
            f'<path d="M{x-4} {y+11} L{x} {y+20} L{x+4} {y+11} Z" fill="{C.DUNE[0]}"><animate attributeName="opacity" values="1;.3;1" dur=".5s" repeatCount="indefinite"/></path>')


def mentoring():
    W, H, pw = 1200, 300, 565
    out = []
    for i, (acc, ic, kicker, title, lines, quote) in enumerate(MENTORING):
        px = 24 + i * (pw + 22)
        out.append(f'<rect x="{px}" y="22" width="{pw}" height="256" rx="18" fill="#FFFFFF" stroke="{BORDER}"/>'
                   f'<path d="{wave_path(pw, 56, 4, 8, 0)}" transform="translate({px} 22)" fill="{acc[0]}" opacity=".55"/><rect x="{px}" y="22" width="{pw}" height="8" fill="{acc[0]}" opacity=".55"/>'
                   f'<circle cx="{px + pw - 54}" cy="82" r="32" fill="{acc[0]}" fill-opacity=".4"/>{mentor_icon(ic, px + pw - 54, 82, acc[1])}'
                   f'<text x="{px + 28}" y="70" font-size="12.5" font-weight="800" letter-spacing="2.5" fill="{acc[1]}">{kicker}</text>'
                   f'<text x="{px + 28}" y="104" font-size="25" font-weight="800" fill="{INK}">{title}</text>'
                   + "".join(f'<text x="{px + 28}" y="{140 + j * 23}" font-size="15.5" fill="{MUTED}">{l}</text>' for j, l in enumerate(lines))
                   + f'<text x="{px + 28}" y="{140 + len(lines) * 23 + 14}" font-size="15.5" font-style="italic" font-weight="700" fill="{acc[1]}">{quote}</text>')
    return frame(W, H, "".join(out), "Mentoring: Bay of Plenty AI Accelerator mentor and trainer; Mission Ready HQ cohort mentor", bg=SAND)


# ---------------------------------------------------------------- tech stack (brand logos in theme colours)
# Logo shapes come from Simple Icons (CC0), stored in scripts/icons.json.
STACK = [
    ("Frontend", "Interfaces people enjoy", C.SKY,
     [("typescript", "TypeScript"), ("javascript", "JavaScript"), ("react", "React"), ("nextdotjs", "Next.js"), ("tailwindcss", "Tailwind"), ("html5", "HTML")]),
    ("Backend &amp; AI", "APIs, agents and models", C.TIDE,
     [("python", "Python"), ("fastapi", "FastAPI"), ("nodedotjs", "Node.js"), ("openai", "OpenAI"), ("anthropic", "Claude")]),
    ("Data &amp; CMS", "Where the content lives", C.KELP,
     [("postgresql", "Postgres"), ("supabase", "Supabase"), ("redis", "Redis"), ("mongodb", "MongoDB"), ("strapi", "Strapi"), ("sanity", "Sanity")]),
    ("Ship it", "From pull request to production", C.CORAL,
     [("docker", "Docker"), ("vercel", "Vercel"), ("git", "Git"), ("github", "GitHub")]),
]


def stack():
    icons = json.loads((Path(__file__).parent / "icons.json").read_text())
    W, H, pw, ph = 1200, 470, 565, 205
    out, n = [], 0
    for i, (title, caption, acc, items) in enumerate(STACK):
        px, py = 24 + (i % 2) * (pw + 22), 22 + (i // 2) * (ph + 18)
        out.append(f'<rect x="{px}" y="{py}" width="{pw}" height="{ph}" rx="18" fill="#FFFFFF" stroke="{BORDER}"/>'
                   f'<path d="{wave_path(pw, 56, 4, 8, 0)}" transform="translate({px} {py})" fill="{acc[0]}" opacity=".55"/>'
                   f'<rect x="{px}" y="{py}" width="{pw}" height="8" fill="{acc[0]}" opacity=".55"/>'
                   f'<text x="{px + 24}" y="{py + 46}" font-size="19" font-weight="800" fill="{acc[1]}">{title}</text>'
                   f'<text x="{px + pw - 24}" y="{py + 46}" font-size="13.5" fill="{MUTED}" text-anchor="end">{caption}</text>')
        for k, (slug, name) in enumerate(items):
            tx, ty = px + 24 + k * 88, py + 70
            n += 1
            out.append(f'<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="3.4s" begin="{n * .23:.2f}s" repeatCount="indefinite"/>'
                       f'<rect x="{tx}" y="{ty}" width="74" height="74" rx="20" fill="{acc[0]}" fill-opacity=".32"/>'
                       f'<path d="{icons[slug]}" transform="translate({tx + 19} {ty + 19}) scale(1.5)" fill="{acc[1]}"/></g>'
                       f'<text x="{tx + 37}" y="{ty + 100}" font-size="13" font-weight="600" fill="{INK}" text-anchor="middle">{name}</text>')
    return frame(W, H, "".join(out), "Tech stack: " + ", ".join(nm for g in STACK for _, nm in g[3]), bg=SAND)


# ---------------------------------------------------------------- toolkit (sea-glass pebbles)
def toolkit():
    W = 1200
    chips = [("RAG + citations", C.KELP), ("AI chat", C.TIDE), ("OpenAI API", C.SKY), ("Anthropic SDK", C.DUNE),
             ("Human-in-the-loop", C.TIDE), ("PII redaction", C.CORAL), ("Voice AI / TTS", C.POHU), ("Prompt design", C.KELP)]
    out, x, y = [], 36, 26
    for k, (t, acc) in enumerate(chips):
        w = int(len(t) * 9.2 + 44)
        if x + w > W - 36:
            x, y = 36, y + 52
        out.append(f'<rect x="{x}" y="{y}" width="{w}" height="40" rx="20" fill="{acc[0]}" fill-opacity=".35"/>'
                   f'<circle cx="{x + 20}" cy="{y + 20}" r="5" fill="{acc[1]}"><animate attributeName="opacity" values="1;.35;1" dur="2.6s" begin="{k * .27:.2f}s" repeatCount="indefinite"/></circle>'
                   f'<text x="{x + 33}" y="{y + 26}" font-size="16" font-weight="700" fill="{INK}">{t}</text>')
        x += w + 12
    return frame(W, y + 66, "".join(out), "AI toolkit")


# ---------------------------------------------------------------- timeline (footprints along the shoreline)
def timeline():
    W, H = 1200, 300
    stops = [
        ("2012", "Network Engineering", ["Diploma, Avonmore", "CompTIA A+ &amp; Network+"], C.SKY),
        ("2012+", "IT &amp; Business Ops", ["IT support, operations", "and running teams"], C.KELP),
        ("2025", "Mission Ready HQ", ["Tech Product Dev cert", "Web Dev &amp; Design diploma"], C.DUNE),
        ("2025", "Joined Seen Ventures", ["Full stack builds", "for NZ organisations"], C.CORAL),
        ("2026", "AI Platforms", ["Governed RAG, own", "products, BOP AI mentor"], C.POHU),
        ("NOW", "AI / Full Stack Eng.", ["Shipping AI products,", "mentoring cohorts"], C.TIDE),
    ]
    x0, x1, ly = 100, 1100, 128
    step = (x1 - x0) / (len(stops) - 1)
    shore = f"M{x0} {ly}" + "".join(f" Q{x0 + i * step + step / 4} {ly - 10} {x0 + i * step + step / 2} {ly} T{x0 + (i + 1) * step} {ly}" for i in range(len(stops) - 1))
    feet, n = [], 0
    for i in range(len(stops) - 1):
        for f in range(3):
            fx = x0 + i * step + 40 + f * 40
            fy = ly + (14 if f % 2 else 24)
            n += 1
            feet.append(f'<ellipse cx="{fx}" cy="{fy}" rx="6" ry="3.4" fill="{SAND_DEEP}" opacity="0"><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="8s" begin="{n * .4:.1f}s" repeatCount="indefinite"/></ellipse>')
    parts = []
    for i, (yr, title, lines, acc) in enumerate(stops):
        x = x0 + i * step
        last = i == len(stops) - 1
        ring = (f'<circle cx="{x}" cy="{ly}" r="14" fill="none" stroke="{acc[1]}" stroke-width="2"><animate attributeName="r" values="14;28;14" dur="2.4s" repeatCount="indefinite"/>'
                f'<animate attributeName="opacity" values="1;0;1" dur="2.4s" repeatCount="indefinite"/></circle>') if last else ""
        parts.append(f"""{ring}
      <circle cx="{x}" cy="{ly}" r="14" fill="{SHELL}" stroke="{acc[0]}" stroke-width="3"/><circle cx="{x}" cy="{ly}" r="6" fill="{acc[1]}"/>
      <text x="{x}" y="{ly - 34}" font-size="{20 if last else 18}" font-weight="800" fill="{acc[1]}" text-anchor="middle">{yr}</text>
      <text x="{x}" y="{ly + 62}" font-size="16" font-weight="700" fill="{INK}" text-anchor="middle">{title}</text>
      <text x="{x}" y="{ly + 86}" font-size="13.5" fill="{MUTED}" text-anchor="middle">{lines[0]}</text>
      <text x="{x}" y="{ly + 105}" font-size="13.5" fill="{MUTED}" text-anchor="middle">{lines[1]}</text>""")
    body = f"""
    <rect y="{ly}" width="{W}" height="{H - ly}" fill="{SAND}"/>
    <path d="M0 {ly} L{x0} {ly} {shore[len(f"M{x0} {ly}"):]} L{W} {ly} L{W} 0 L0 0 Z" fill="#E6F0EE"/>
    <path d="{shore}" fill="none" stroke="{C.TIDE[0]}" stroke-width="4" stroke-linecap="round" stroke-dasharray="1100" stroke-dashoffset="1100">
      <animate attributeName="stroke-dashoffset" values="1100;0;0" keyTimes="0;.45;1" dur="7s" repeatCount="indefinite"/></path>
    {''.join(feet)}{''.join(parts)}"""
    return frame(W, H, body, "Career timeline from network engineering in 2012 to AI / Full Stack Engineer at Seen Ventures")


# ---------------------------------------------------------------- activity ("tides of code")
def fetch_calendar():
    q = '{ user(login:"%s"){ contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } } } } }' % USER
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    if token:  # GitHub Actions
        req = urllib.request.Request("https://api.github.com/graphql", data=json.dumps({"query": q}).encode(),
                                     headers={"Authorization": f"bearer {token}", "Content-Type": "application/json", "User-Agent": "profile-builder"})
        with urllib.request.urlopen(req, timeout=30) as r:
            data = json.load(r)
    else:  # local: use the logged-in gh CLI
        data = json.loads(subprocess.run(["gh", "api", "graphql", "-f", f"query={q}"], capture_output=True, text=True, check=True).stdout)
    cal = data["data"]["user"]["contributionsCollection"]["contributionCalendar"]
    return cal["totalContributions"], [[(d["date"], d["contributionCount"]) for d in w["contributionDays"]] for w in cal["weeks"]]


def smooth(points):
    d = f"M{points[0][0]:.1f} {points[0][1]:.1f}"
    for i in range(len(points) - 1):
        p0 = points[max(i - 1, 0)]; p1 = points[i]; p2 = points[i + 1]; p3 = points[min(i + 2, len(points) - 1)]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f" C{c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} {p2[0]:.1f} {p2[1]:.1f}"
    return d


def activity():
    total, weeks = fetch_calendar()
    days = [d for w in weeks for d in w]
    counts = [c for _, c in days]
    longest = cur = 0
    for c in counts:
        cur = cur + 1 if c else 0
        longest = max(longest, cur)
    active = sum(1 for c in counts if c)
    weekly = [sum(c for _, c in w) for w in weeks]
    best_week = max(weekly) if weekly else 0

    W, H = 1200, 400
    cell, gap = 15, 4
    gx, gy = 108, 228
    levels = ["#EDE3D1", "#D3E4E0", "#A9CBC6", "#77A7A3", "#3F6E71"]
    nz = sorted(c for c in counts if c)
    qs = [nz[int(len(nz) * f)] for f in (.25, .5, .75)] if nz else [1, 2, 3]

    def lvl(c):
        if c == 0:
            return 0
        return 1 + sum(c > q for q in qs)

    cells, months, last_m = [], [], None
    for wi, w in enumerate(weeks):
        for date, c in w:
            di = dt.date.fromisoformat(date).weekday()  # Mon=0
            row = (di + 1) % 7                           # GitHub layout: Sun at top
            x, y = gx + wi * (cell + gap), gy + row * (cell + gap)
            cells.append(f'<rect x="{x}" y="{y}" width="{cell}" height="{cell}" rx="4" fill="{levels[lvl(c)]}"><title>{c} contributions on {date}</title></rect>')
        m = dt.date.fromisoformat(w[0][0]).strftime("%b")
        if m != last_m and wi < len(weeks) - 2:
            months.append(f'<text x="{gx + wi * (cell + gap)}" y="{gy - 10}" font-size="12.5" fill="{MUTED}">{m}</text>')
            last_m = m
    daylabels = "".join(f'<text x="{gx - 12}" y="{gy + r * (cell + gap) + 12}" font-size="12" fill="{MUTED}" text-anchor="end">{t}</text>' for r, t in [(1, "Mon"), (3, "Wed"), (5, "Fri")])

    # weekly totals drawn as a tide line
    top, base = 108, 196
    mx = max(weekly) ** .5 or 1  # square-root scale so one huge week doesn't flatten the rest
    pts = [(gx + i * (cell + gap) + cell / 2, base - (v ** .5 / mx) * (base - top)) for i, v in enumerate(weekly)]
    line = smooth(pts)
    area = line + f" L{pts[-1][0]:.1f} {base} L{pts[0][0]:.1f} {base} Z"
    gw = len(weeks) * (cell + gap)

    stats = [(f"{total:,}", "contributions this year", C.TIDE), (f"{active}", "days at the beach (active)", C.KELP),
             (f"{longest}", "day longest streak", C.CORAL), (f"{best_week}", "biggest swell (week)", C.DUNE)]
    st = "".join(
        f'<rect x="{40 + i * 285}" y="22" width="265" height="64" rx="16" fill="{a[0]}" fill-opacity=".28"/>'
        f'<text x="{60 + i * 285}" y="62" font-size="28" font-weight="800" fill="{a[1]}">{v}</text>'
        f'<text x="{68 + i * 285 + len(v) * 17}" y="61" font-size="14" fill="{INK}">{lbl}</text>' for i, (v, lbl, a) in enumerate(stats))
    legend = "".join(f'<rect x="{gx + gw - 5 * 19 - 4 + k * 19}" y="{gy + 7 * (cell + gap) + 12}" width="{cell}" height="{cell}" rx="4" fill="{levels[k]}"/>' for k in range(5))
    body = f"""
    {st}
    <text x="{gx}" y="{top - 8}" font-size="13" font-weight="700" letter-spacing="2" fill="{MUTED}">WEEKLY TIDE</text>
    <path d="{area}" fill="url(#tide)"/>
    <path d="{line}" fill="none" stroke="{C.TIDE[1]}" stroke-width="2.4" stroke-linejoin="round" stroke-dasharray="{gw * 2}" stroke-dashoffset="{gw * 2}">
      <animate attributeName="stroke-dashoffset" values="{gw * 2};0;0" keyTimes="0;.4;1" dur="8s" repeatCount="indefinite"/></path>
    <line x1="{gx}" y1="{base}" x2="{gx + gw - gap}" y2="{base}" stroke="{BORDER}"/>
    {''.join(months)}{daylabels}{''.join(cells)}
    <text x="{gx + gw - 5 * 19 - 12}" y="{gy + 7 * (cell + gap) + 24}" font-size="12" fill="{MUTED}" text-anchor="end">Calm</text>
    {legend}
    <text x="{gx + gw + 2}" y="{gy + 7 * (cell + gap) + 24}" font-size="12" fill="{MUTED}">Swell</text>
    <text x="{gx}" y="{gy + 7 * (cell + gap) + 24}" font-size="12" fill="{MUTED}">Includes private work · updated {dt.date.today():%d %b %Y}</text>"""
    defs = f'<linearGradient id="tide" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{C.TIDE[0]}" stop-opacity=".75"/><stop offset="1" stop-color="{C.TIDE[0]}" stop-opacity=".1"/></linearGradient>'
    write("activity.svg", frame(W, H, body, f"{total} GitHub contributions in the last year", extra_defs=defs))


# ---------------------------------------------------------------- off the clock
def offclock():
    W, H, tw = 1200, 210, 268
    specs = [("80s vinyl collector", C.SKY, "vinyl"), ("Papamoa beach explorer", C.TIDE, "wave"), ("Golf fan", C.KELP, "golf"), ("Proud dad", C.POHU, "heart")]
    tiles = []
    for i, (label, acc, kind) in enumerate(specs):
        x = 28 + i * (tw + 22)
        cx, cy = x + tw / 2, 88
        base = f'<circle cx="{cx}" cy="{cy}" r="42" fill="{acc[0]}" fill-opacity=".35"/>'
        if kind == "vinyl":
            g = (f'<g><animateTransform attributeName="transform" type="rotate" values="0 {cx} {cy};360 {cx} {cy}" dur="4s" repeatCount="indefinite"/>'
                 f'<circle cx="{cx}" cy="{cy}" r="38" fill="#3A4A52"/>' + "".join(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="#56666E"/>' for r in (32, 26, 21))
                 + f'<circle cx="{cx}" cy="{cy}" r="12" fill="{C.CORAL[0]}"/><rect x="{cx - 2}" y="{cy - 12}" width="4" height="7" fill="{SHELL}" opacity=".7"/><circle cx="{cx}" cy="{cy}" r="2.5" fill="{SHELL}"/></g>')
            g = base + g
        elif kind == "wave":
            wp = wave_path(int(tw * 2), 60, 7, 0, 40)
            g = (f'<clipPath id="wc"><circle cx="{cx}" cy="{cy}" r="42"/></clipPath>{base}<circle cx="{cx + 14}" cy="{cy - 14}" r="10" fill="#F4D3B2"/>'
                 f'<g clip-path="url(#wc)"><path d="{wp}" fill="{acc[0]}"><animateTransform attributeName="transform" type="translate" values="{x} {cy + 4};{x - 60} {cy + 4}" dur="2.6s" repeatCount="indefinite"/></path>'
                 f'<path d="{wp}" fill="{acc[1]}" opacity=".55"><animateTransform attributeName="transform" type="translate" values="{x - 30} {cy + 16};{x - 90} {cy + 16}" dur="3.6s" repeatCount="indefinite"/></path>'
                 f'<rect x="{x}" y="{cy + 30}" width="{tw}" height="20" fill="{SAND_DEEP}"/></g>')
        elif kind == "golf":
            g = (f'{base}<ellipse cx="{cx}" cy="{cy + 24}" rx="26" ry="6" fill="{acc[1]}" opacity=".35"/><line x1="{cx - 4}" y1="{cy + 24}" x2="{cx - 4}" y2="{cy - 26}" stroke="{INK}" stroke-width="2.5"/>'
                 f'<path d="M{cx - 4} {cy - 26} L{cx + 20} {cy - 18} L{cx - 4} {cy - 10} Z" fill="{C.POHU[1]}"><animate attributeName="d" values="M{cx - 4} {cy - 26} L{cx + 20} {cy - 18} L{cx - 4} {cy - 10} Z;M{cx - 4} {cy - 26} L{cx + 17} {cy - 21} L{cx - 4} {cy - 10} Z;M{cx - 4} {cy - 26} L{cx + 20} {cy - 18} L{cx - 4} {cy - 10} Z" dur="1.2s" repeatCount="indefinite"/></path>'
                 f'<circle cx="{cx + 16}" cy="{cy + 20}" r="4.5" fill="#FFFFFF" stroke="{BORDER}"/>')
        else:
            g = (f'{base}<g transform="translate({cx} {cy})"><path d="M0 22 C-40 -4 -22 -34 0 -14 C22 -34 40 -4 0 22 Z" fill="{acc[1]}">'
                 f'<animateTransform attributeName="transform" type="scale" values="1;1.14;1;1.08;1" dur="1.4s" repeatCount="indefinite"/></path></g>')
        tiles.append(f'<rect x="{x}" y="20" width="{tw}" height="170" rx="18" fill="#FFFFFF" stroke="{BORDER}"/>{g}'
                     f'<text x="{cx}" y="166" font-size="16" font-weight="700" fill="{INK}" text-anchor="middle">{label}</text>')
    return frame(W, H, "".join(tiles), "Off the clock: 80s vinyl, Papamoa beach, golf, family", bg=SAND)


# ---------------------------------------------------------------- let's connect
def contact_banner():
    W, H = 1200, 270
    sx, sy, sw, sh = 740, 24, 436, 222          # beach scene inset
    sea_y, sand_y = sy + 96, sy + 168
    bottle = f'''
      <g><animateTransform attributeName="transform" type="translate" values="{sx + 200} {sea_y + 30};{sx + 212} {sea_y + 24};{sx + 200} {sea_y + 30}" dur="4s" repeatCount="indefinite"/>
        <g><animateTransform attributeName="transform" type="rotate" values="-9;7;-9" dur="3.2s" repeatCount="indefinite"/>
          <rect x="-36" y="-13" width="54" height="26" rx="11" fill="#CFE3D8" stroke="{C.TIDE[1]}" stroke-width="2"/>
          <rect x="17" y="-6.5" width="17" height="13" rx="3" fill="#CFE3D8" stroke="{C.TIDE[1]}" stroke-width="2"/>
          <rect x="33" y="-5.5" width="8" height="11" rx="2" fill="{C.DUNE[1]}"/>
          <rect x="-27" y="-6" width="36" height="12" rx="4" fill="#FBF3E4" stroke="{C.DUNE[0]}"/>
          <path d="M-22 -1.5 H4 M-22 2.5 H-2" stroke="{C.DUNE[1]}" stroke-width="1.3" opacity=".7"/>
          <rect x="-32" y="-10" width="20" height="4" rx="2" fill="#FFFFFF" opacity=".7"/>
        </g>
      </g>'''
    scene = f'''
    <clipPath id="scene"><rect x="{sx}" y="{sy}" width="{sw}" height="{sh}" rx="18"/></clipPath>
    <g clip-path="url(#scene)">
      <rect x="{sx}" y="{sy}" width="{sw}" height="{sh}" fill="url(#csky)"/>
      <circle cx="{sx + 340}" cy="{sea_y - 6}" r="60" fill="url(#cglow)"/><circle cx="{sx + 340}" cy="{sea_y - 6}" r="24" fill="#F4D3B2"/>
      <path d="M{sx + 40} {sea_y} C{sx + 70} {sea_y - 18} {sx + 96} {sea_y - 50} {sx + 122} {sea_y - 52} C{sx + 146} {sea_y - 54} {sx + 160} {sea_y - 34} {sx + 176} {sea_y - 18} C{sx + 190} {sea_y - 6} {sx + 210} {sea_y} {sx + 230} {sea_y} Z" fill="#AFBEC3"/>
      <rect x="{sx}" y="{sea_y}" width="{sw}" height="{sh}" fill="url(#csea)"/>
      <path d="{wave_path(1200, 100, 4, sea_y + 22, sea_y + 30).split(' L')[0]}" fill="none" stroke="#FFFFFF" stroke-width="2" opacity=".7" transform="translate({sx} 0)">
        <animateTransform attributeName="transform" type="translate" values="{sx} 0;{sx - 100} 0" dur="4s" repeatCount="indefinite"/></path>
      {bottle}
      <g><animateTransform attributeName="transform" type="translate" values="{sx - 20} {sy + 40};{sx + sw + 20} {sy + 26}" dur="16s" repeatCount="indefinite"/>
        <path d="M-10 0 Q-5 -6 0 0 Q5 -6 10 0" fill="none" stroke="#5E6F76" stroke-width="2" stroke-linecap="round">
          <animate attributeName="d" values="M-10 0 Q-5 -6 0 0 Q5 -6 10 0;M-10 -3 Q-5 2 0 0 Q5 2 10 -3;M-10 0 Q-5 -6 0 0 Q5 -6 10 0" dur="1.1s" repeatCount="indefinite"/></path></g>
      <rect x="{sx}" y="{sand_y}" width="{sw}" height="{sh}" fill="{SAND}"/>
      <path d="{wave_path(1200, 120, 6, sand_y, sand_y + 12)}" fill="#FFFFFF" opacity=".9"><animateTransform attributeName="transform" type="translate" values="{sx} -4;{sx - 60} 4;{sx - 120} -4" dur="6s" repeatCount="indefinite"/></path>
      <path d="M{sx + 330} {sand_y + 40} l10 -14 l10 14 z" fill="{C.CORAL[0]}" opacity=".8"/>
      <ellipse cx="{sx + 80}" cy="{sand_y + 36}" rx="9" ry="5" fill="{C.DUNE[0]}"/>
    </g>'''
    chips, cx = [], 52
    for label, acc in [("Papamoa, Aotearoa NZ", C.TIDE), ("NZ time (UTC+12/13)", C.SKY)]:
        w = int(len(label) * 7.7 + 44)
        dot = (f'<path d="M{cx + 20} {205} c-5 -6 -7 -9 -7 -12 a7 7 0 0 1 14 0 c0 3 -2 6 -7 12 z" fill="{acc[1]}"/>' if acc is C.TIDE
               else f'<circle cx="{cx + 20}" cy="197" r="7" fill="none" stroke="{acc[1]}" stroke-width="2"/><path d="M{cx + 20} 193 V197 H{cx + 23}" stroke="{acc[1]}" stroke-width="2" fill="none"/>')
        chips.append(f'<rect x="{cx}" y="180" width="{w}" height="34" rx="17" fill="{acc[0]}" fill-opacity=".35"/>{dot}<text x="{cx + 34}" y="202" font-size="14" font-weight="700" fill="{INK}">{label}</text>')
        cx += w + 10
    body = f'''
    {scene}
    <text x="52" y="62" font-size="13" font-weight="800" letter-spacing="3" fill="{C.CORAL[1]}">LET'S HAVE A KŌRERO</text>
    <text x="50" y="104" font-size="34" font-weight="800" fill="{INK}">Got an idea? Send a message</text>
    <text x="50" y="142" font-size="34" font-weight="800" fill="{C.TIDE[1]}">in a bottle (or an email).</text>
    {''.join(chips)}'''
    defs = f'''<linearGradient id="csky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D6E5EA"/><stop offset=".45" stop-color="#F3E3D3"/></linearGradient>
    <linearGradient id="csea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A9C7C8"/><stop offset=".3" stop-color="#C6DCD9"/></linearGradient>
    <radialGradient id="cglow"><stop offset="0" stop-color="#F3C4A2" stop-opacity=".7"/><stop offset="1" stop-color="#F3C4A2" stop-opacity="0"/></radialGradient>'''
    return frame(W, H, body, "Let's have a kōrero. Got an idea? Send a message in a bottle, or an email.", extra_defs=defs)


def contact_icon(kind, x, y, c):
    if kind == "mail":
        return (f'<rect x="{x - 18}" y="{y - 12}" width="36" height="25" rx="4" fill="none" stroke="{c}" stroke-width="2.6"/>'
                f'<path d="M{x - 17} {y - 10} L{x} {y + 3} L{x + 17} {y - 10}" fill="none" stroke="{c}" stroke-width="2.6" stroke-linejoin="round">'
                f'<animate attributeName="d" values="M{x - 17} {y - 10} L{x} {y + 3} L{x + 17} {y - 10};M{x - 17} {y - 10} L{x} {y - 2} L{x + 17} {y - 10};M{x - 17} {y - 10} L{x} {y + 3} L{x + 17} {y - 10}" dur="2.4s" repeatCount="indefinite"/></path>')
    if kind == "linkedin":
        return (f'<rect x="{x - 17}" y="{y - 17}" width="34" height="34" rx="7" fill="{c}"/>'
                f'<text x="{x}" y="{y + 8}" font-size="21" font-weight="800" fill="{SHELL}" text-anchor="middle">in</text>')
    return (f'<circle cx="{x}" cy="{y}" r="17" fill="none" stroke="{c}" stroke-width="2.6"/>'
            f'<ellipse cx="{x}" cy="{y}" rx="7" ry="17" fill="none" stroke="{c}" stroke-width="2.2"><animate attributeName="rx" values="7;12;3;7" dur="5s" repeatCount="indefinite"/></ellipse>'
            f'<path d="M{x - 16} {y - 6} H{x + 16} M{x - 16} {y + 6} H{x + 16}" stroke="{c}" stroke-width="2.2"/>')


CONTACTS = [
    ("contact-email.svg", "mail", C.TIDE, "EMAIL", "robwynyard@outlook.com", "Drop me a line"),
    ("contact-linkedin.svg", "linkedin", C.SKY, "LINKEDIN", "Rob Wynyard", "Connect with me"),
    ("contact-seen.svg", "globe", C.CORAL, "SEEN VENTURES", "seen-ventures.com", "See where I work"),
]


# ---------------------------------------------------------------- intro + link pills (top of page)
def link_pill(fname, kind, acc, label, sub):
    W, H = 290, 64
    body = f'''
    <rect width="{W}" height="{H}" fill="{acc[0]}" fill-opacity=".22"/>
    <circle cx="34" cy="32" r="21" fill="{acc[0]}" fill-opacity=".55"/>
    <g transform="translate(34 32) scale(.62) translate(-34 -32)">{contact_icon(kind, 34, 32, acc[1])}</g>
    <text x="66" y="29" font-size="16.5" font-weight="800" fill="{INK}">{label}</text>
    <text x="66" y="48" font-size="12.5" font-weight="700" fill="{acc[1]}">{sub}</text>
    <text x="{W - 24}" y="38" font-size="18" font-weight="800" fill="{acc[1]}" text-anchor="end">→
      <animate attributeName="x" values="{W - 24};{W - 18};{W - 24}" dur="1.4s" repeatCount="indefinite"/></text>'''
    write(fname, frame(W, H, body, f"{label}: {sub}"))


PILLS = [
    ("pill-linkedin.svg", "linkedin", C.SKY, "LinkedIn", "Let's connect"),
    ("pill-email.svg", "mail", C.TIDE, "Email", "Say kia ora"),
    ("pill-seen.svg", "globe", C.CORAL, "Seen Ventures", "seen-ventures.com"),
]


def intro():
    W, H = 1200, 330
    acx, acy = 128, 150
    para = [
        ('I\'m an <tspan font-weight="800" fill="{t}">AI / Full Stack Engineer</tspan> at <tspan font-weight="800" fill="{t}">Seen Ventures</tspan>, based in sunny Papamoa.'),
        ('I build AI products for New Zealand organisations end to end: <tspan font-weight="700" fill="{i}">agentic systems</tspan>'),
        ('and <tspan font-weight="700" fill="{i}">RAG pipelines that show their sources</tspan>, on Next.js and FastAPI platforms'),
        ('that real people use every day.'),
    ]
    lines = "".join(f'<text x="268" y="{122 + j * 27}" font-size="17.5" fill="{MUTED}">{l.format(t=C.TIDE[1], i=INK)}</text>' for j, l in enumerate(para))
    body = f'''
    <circle cx="{W}" cy="0" r="230" fill="{C.TIDE[0]}" opacity=".14"/>
    <circle cx="0" cy="{H}" r="160" fill="{C.DUNE[0]}" opacity=".18"/>
    <clipPath id="av"><circle cx="{acx}" cy="{acy}" r="78"/></clipPath>
    <g clip-path="url(#av)">
      <rect x="{acx - 80}" y="{acy - 80}" width="160" height="160" fill="url(#avsky)"/>
      <circle cx="{acx + 30}" cy="{acy + 6}" r="16" fill="#F4D3B2"/>
      <path d="M{acx - 80} {acy + 18} C{acx - 50} {acy + 8} {acx - 36} {acy - 20} {acx - 14} {acy - 22} C{acx + 4} {acy - 24} {acx + 12} {acy} {acx + 30} {acy + 18} Z" fill="#AFBEC3"/>
      <rect x="{acx - 80}" y="{acy + 18}" width="160" height="80" fill="#B4D0CF"/>
      <path d="{wave_path(480, 60, 5, acy + 48, acy + 90)}" fill="#FFFFFF" opacity=".85"><animateTransform attributeName="transform" type="translate" values="{acx - 80} 0;{acx - 140} 0" dur="3s" repeatCount="indefinite"/></path>
      <rect x="{acx - 80}" y="{acy + 56}" width="160" height="40" fill="{SAND}"/>
    </g>
    <circle cx="{acx}" cy="{acy}" r="78" fill="none" stroke="#FFFFFF" stroke-width="6"/>
    <circle cx="{acx}" cy="{acy}" r="82" fill="none" stroke="{C.TIDE[0]}" stroke-width="2"/>
    <rect x="{acx - 44}" y="{acy + 66}" width="88" height="30" rx="15" fill="{SHELL}" stroke="{BORDER}"/>
    <text x="{acx}" y="{acy + 86}" font-size="13" font-weight="800" letter-spacing="1.5" fill="{C.TIDE[1]}" text-anchor="middle">PAPAMOA</text>
    <g transform="translate(268 76)">
      <text font-size="36" font-weight="800" fill="{INK}">Kia ora! I'm Rob.</text>
      <g transform="translate(330 -4)"><g><animateTransform attributeName="transform" type="rotate" values="0 0 8;20 0 8;-10 0 8;20 0 8;0 0 8;0 0 8" keyTimes="0;.1;.2;.3;.4;1" dur="3s" repeatCount="indefinite"/>
        <path d="M-7 10 v-15 a3 3 0 0 1 6 0 v8 v-12 a3 3 0 0 1 6 0 v12 v-10 a3 3 0 0 1 6 0 v12 v-6 a3 3 0 0 1 6 0 v8 c0 9 -5 15 -13 15 c-6 0 -9 -3 -12 -8 l-5 -8 a3 3 0 0 1 5 -3 z" fill="{C.DUNE[0]}" stroke="{C.DUNE[1]}" stroke-width="1.6" stroke-linejoin="round"/></g></g>
    </g>
    {lines}
    <rect x="268" y="236" width="890" height="64" rx="16" fill="{C.KELP[0]}" fill-opacity=".28"/>
    <g transform="translate(300 268)">
      <circle cx="-2" cy="-8" r="5" fill="{C.KELP[1]}"/><circle cx="16" cy="8" r="5" fill="{C.KELP[1]}"/><circle cx="-2" cy="10" r="5" fill="{C.KELP[1]}" opacity=".6"/>
      <path d="M-2 -8 L16 8 L-2 10" fill="none" stroke="{C.KELP[1]}" stroke-width="2"/>
    </g>
    <text x="336" y="262" font-size="15.5" fill="{INK}">I came to software from <tspan font-weight="800">network engineering, IT support and business operations</tspan>,</text>
    <text x="336" y="285" font-size="15.5" fill="{INK}">so I care about tools that work for the people using them, not only for the demo.</text>'''
    defs = '<linearGradient id="avsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D6E5EA"/><stop offset=".6" stop-color="#F3E3D3"/></linearGradient>'
    return frame(W, H, body, "Kia ora! I'm Rob, an AI / Full Stack Engineer at Seen Ventures, based in Papamoa.", extra_defs=defs)


def contact_card(fname, kind, acc, label, value, cta):
    W, H = 390, 150
    body = f'''
    <circle cx="{W}" cy="0" r="110" fill="{acc[0]}" opacity=".2"/>
    <circle cx="62" cy="62" r="34" fill="{acc[0]}" fill-opacity=".4"/>
    {contact_icon(kind, 62, 62, acc[1])}
    <text x="112" y="48" font-size="12" font-weight="800" letter-spacing="2.5" fill="{acc[1]}">{label}</text>
    <text x="112" y="76" font-size="{17 if len(value) > 16 else 20}" font-weight="800" fill="{INK}">{value}</text>
    <text x="112" y="108" font-size="14.5" font-weight="700" fill="{acc[1]}">{cta}
      <tspan dx="6">→<animate attributeName="dx" values="6;12;6" dur="1.4s" repeatCount="indefinite"/></tspan></text>
    <path d="{wave_path(780, 130, 4, 136, H)}" fill="{acc[0]}" opacity=".6"><animateTransform attributeName="transform" type="translate" values="0 0;-130 0" dur="5s" repeatCount="indefinite"/></path>'''
    write(fname, frame(W, H, body, f"{label.title()}: {value}"))


# ---------------------------------------------------------------- education & certifications
EDUCATION = [
    ("missionready", C.TIDE, "DIPLOMA", ["Web Development", "&amp; Design"], "Mission Ready HQ", "2025"),
    ("missionready", C.CORAL, "CERTIFICATE", ["Tech Product", "Development"], "Mission Ready HQ", "2025"),
    ("avonmore", C.SKY, "DIPLOMA", ["Network", "Engineering"], "Avonmore Tertiary Institute", "2012"),
    ("comptia", C.KELP, "CERTIFICATIONS", ["CompTIA A+", "&amp; Network+"], "CompTIA", "2012"),
]


# Institution logos, tinted to each card's colour. Sources in scripts/logos/:
#   mission-ready.svg  from missionreadyhq.com (site footer logo); only the round "M" mark is shown
#   avonmore.png       from avonmore.ac.nz via the Internet Archive (2014); only the "A" mark is shown
LOGO_CROPS = {"missionready": ("mission-ready.svg", "image/svg+xml", 1440, 810, "0 175 440 440"),
              "avonmore": ("avonmore.png", "image/png", 245, 46, "0 0 44 46")}


def logo_defs(colours):
    import base64
    out = []
    for key, (fname, mime, w, h, vb) in LOGO_CROPS.items():
        data = base64.b64encode((Path(__file__).parent / "logos" / fname).read_bytes()).decode()
        out.append(f'<symbol id="logo-{key}" viewBox="{vb}"><image width="{w}" height="{h}" href="data:{mime};base64,{data}"/></symbol>')
    for c in colours:
        r, g, b = (int(c[i:i + 2], 16) / 255 for i in (1, 3, 5))
        # paint every pixel in the card colour; alpha drops for light pixels so white backgrounds vanish
        out.append(f'<filter id="tint{c[1:]}" x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" '
                   f'values="0 0 0 0 {r:.3f}  0 0 0 0 {g:.3f}  0 0 0 0 {b:.3f}  -0.32 -1.07 -0.11 1.5 0"/></filter>')
    return "".join(out)


def edu_icon(kind, x, y, c):
    if kind in LOGO_CROPS:
        return f'<g filter="url(#tint{c[1:]})"><use href="#logo-{kind}" x="{x - 23}" y="{y - 23}" width="46" height="46"/></g>'
    if kind == "cap":
        return (f'<path d="M{x} {y - 14} L{x + 22} {y - 4} L{x} {y + 6} L{x - 22} {y - 4} Z" fill="{c}"/>'
                f'<path d="M{x - 12} {y + 1} V{y + 10} Q{x} {y + 17} {x + 12} {y + 10} V{y + 1}" fill="{c}" opacity=".75"/>'
                f'<g><animateTransform attributeName="transform" type="rotate" values="-8 {x + 18} {y - 4};8 {x + 18} {y - 4};-8 {x + 18} {y - 4}" dur="2.4s" repeatCount="indefinite"/>'
                f'<path d="M{x + 18} {y - 4} V{y + 10}" stroke="{c}" stroke-width="2"/><circle cx="{x + 18}" cy="{y + 12}" r="3" fill="{C.DUNE[1]}"/></g>')
    if kind == "comptia":  # CompTIA logo from Simple Icons (scripts/icons.json)
        path = json.loads((Path(__file__).parent / "icons.json").read_text())["comptia"]
        return f'<path d="{path}" transform="translate({x - 30} {y - 30}) scale(2.5)" fill="{c}"/>'
    if kind == "rocket":
        return mentor_icon("rocket", x, y, c)
    if kind == "network":
        pts = [(x, y - 14), (x - 15, y + 10), (x + 15, y + 10), (x, y + 2)]
        lines = "".join(f'<line x1="{pts[3][0]}" y1="{pts[3][1]}" x2="{px}" y2="{py}" stroke="{c}" stroke-width="2.2"/>' for px, py in pts[:3])
        dots = "".join(f'<circle cx="{px}" cy="{py}" r="{6 if k == 3 else 4.5}" fill="{c}"><animate attributeName="opacity" values="1;.4;1" dur="2s" begin="{k * .3}s" repeatCount="indefinite"/></circle>' for k, (px, py) in enumerate(pts))
        return lines + dots
    pins = "".join(f'<path d="M{x - 9 + k * 9} {y - 18} v5 M{x - 9 + k * 9} {y + 13} v5 M{x - 18} {y - 9 + k * 9} h5 M{x + 13} {y - 9 + k * 9} h5" stroke="{c}" stroke-width="2.2" stroke-linecap="round"/>' for k in range(3))
    return (f'{pins}<rect x="{x - 13}" y="{y - 13}" width="26" height="26" rx="5" fill="{c}"/>'
            f'<rect x="{x - 6}" y="{y - 6}" width="12" height="12" rx="2" fill="{SHELL}"><animate attributeName="opacity" values="1;.4;1" dur="1.8s" repeatCount="indefinite"/></rect>')


def seal(x, y, acc, year):
    bumps = "".join(f'<circle cx="{x + 25 * __import__("math").cos(k * 0.5236):.1f}" cy="{y + 25 * __import__("math").sin(k * 0.5236):.1f}" r="7" fill="{acc[0]}"/>' for k in range(12))
    return (f'<path d="M{x - 12} {y + 14} L{x - 18} {y + 44} L{x - 8} {y + 38} L{x - 2} {y + 46} L{x + 2} {y + 16} Z" fill="{acc[1]}" opacity=".8"/>'
            f'<path d="M{x + 12} {y + 14} L{x + 18} {y + 44} L{x + 8} {y + 38} L{x + 2} {y + 46} L{x - 2} {y + 16} Z" fill="{acc[1]}" opacity=".65"/>'
            f'<g><animateTransform attributeName="transform" type="rotate" values="0 {x} {y};30 {x} {y}" dur="12s" repeatCount="indefinite"/>{bumps}</g>'
            f'<circle cx="{x}" cy="{y}" r="24" fill="{acc[0]}"/><circle cx="{x}" cy="{y}" r="19" fill="{acc[1]}"/>'
            f'<circle cx="{x}" cy="{y}" r="15.5" fill="none" stroke="{SHELL}" stroke-width="1" stroke-dasharray="2 2" opacity=".7"/>'
            f'<text x="{x}" y="{y + 4.5}" font-size="12.5" font-weight="800" fill="{SHELL}" text-anchor="middle">{year}</text>')


def education():
    W, H, cw, gap = 1200, 290, 270, 20
    out = []
    for i, (ic, acc, kind, title, where, year) in enumerate(EDUCATION):
        x = 25 + i * (cw + gap)
        out.append(f'<rect x="{x}" y="22" width="{cw}" height="246" rx="18" fill="#FFFFFF" stroke="{BORDER}"/>'
                   f'<path d="{wave_path(cw, 54, 4, 8, 0)}" transform="translate({x} 22)" fill="{acc[0]}" opacity=".55"/><rect x="{x}" y="22" width="{cw}" height="8" fill="{acc[0]}" opacity=".55"/>'
                   f'<circle cx="{x + 52}" cy="86" r="32" fill="{acc[0]}" fill-opacity=".4"/>{edu_icon(ic, x + 52, 86, acc[1])}'
                   f'{seal(x + cw - 50, 76, acc, year)}'
                   f'<text x="{x + 24}" y="152" font-size="12" font-weight="800" letter-spacing="2.5" fill="{acc[1]}">{kind}</text>'
                   + "".join(f'<text x="{x + 24}" y="{180 + j * 25}" font-size="20" font-weight="800" fill="{INK}">{t}</text>' for j, t in enumerate(title))
                   + f'<line x1="{x + 24}" y1="222" x2="{x + cw - 24}" y2="222" stroke="{BORDER}" stroke-dasharray="4 4"/>'
                   f'<text x="{x + 24}" y="248" font-size="14" font-weight="600" fill="{MUTED}">{where}</text>')
    label = "; ".join(f"{k.title()} in {' '.join(t).replace('&amp;', '&')}, {w}, {y}" for _, _, k, t, w, y in EDUCATION)
    return frame(W, H, "".join(out), "Education and certifications: " + label, bg=SAND,
                 extra_defs=logo_defs(sorted({e[1][1] for e in EDUCATION})))


def footer():
    W, H = 1200, 120
    layers = [(wave_path(2400, 300, 14, 40, H), "#D3E4E0", "0 0;-300 0", 11), (wave_path(2400, 400, 11, 56, H), "#A9CBC6", "-400 0;0 0", 14),
              (wave_path(2400, 240, 8, 74, H), "#FFFFFF", "0 0;-240 0", 8), (wave_path(2400, 300, 6, 86, H), SAND, "-300 0;0 0", 10)]
    body = "".join(f'<path d="{d}" fill="{c}"><animateTransform attributeName="transform" type="translate" values="{v}" dur="{s}s" repeatCount="indefinite"/></path>' for d, c, v, s in layers)
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-label="Waves on Papamoa beach"><defs><clipPath id="fr"><rect width="{W}" height="{H}" rx="22"/></clipPath></defs><g clip-path="url(#fr)">{body}</g></svg>'


if __name__ == "__main__":
    write("header.svg", header())
    write("role.svg", role())
    for p in PROJECTS:
        card(*p)
    write("stack.svg", stack())
    write("mentoring.svg", mentoring())
    write("toolkit.svg", toolkit())
    write("timeline.svg", timeline())
    write("off-the-clock.svg", offclock())
    write("footer.svg", footer())
    write("contact.svg", contact_banner())
    for c in CONTACTS:
        contact_card(*c)
    write("intro.svg", intro())
    for p in PILLS:
        link_pill(*p)
    heading("h-seen.svg", "Things I've built", C.TIDE)
    heading("h-stack.svg", "Tech stack", C.SKY)
    heading("h-journey.svg", "The journey so far", C.DUNE)
    heading("h-edu.svg", "Education &amp; certifications", C.SKY)
    write("education.svg", education())
    heading("h-mentor.svg", "Mentoring &amp; teaching", C.CORAL)
    heading("h-activity.svg", "Tides of code", C.TIDE)
    heading("h-life.svg", "Off the clock", C.POHU)
    heading("h-contact.svg", "Let's connect", C.KELP)
    activity()
