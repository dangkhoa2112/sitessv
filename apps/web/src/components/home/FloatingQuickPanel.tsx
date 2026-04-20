'use client';

import Link from 'next/link';
import { useState } from 'react';

type QuickItem = {
  label: string;
  href: string;
};

type FloatingQuickPanelProps = {
  title: string;
  quickLinks: QuickItem[];
  shortcuts: QuickItem[];
  shortcutTitle?: string;
  openLabel?: string;
  closeLabel?: string;
  variant?: 'default' | 'ultra-minimal';
};

function isExternalLink(href: string) {
  return href.startsWith('http://') || href.startsWith('https://');
}

export function FloatingQuickPanel({
  title,
  quickLinks,
  shortcuts,
  shortcutTitle = 'Shortcut',
  openLabel = 'Open quick menu',
  closeLabel = 'Collapse quick menu',
  variant = 'default'
}: FloatingQuickPanelProps) {
  const [collapsed, setCollapsed] = useState(false);
  const isUltra = variant === 'ultra-minimal';
  const ultraQuickLinks = quickLinks.slice(0, 3);
  const ultraShortcuts = shortcuts.slice(0, 2);
  const panelWidthClass = isUltra ? 'w-[252px]' : 'w-[252px]';
  const panelTopClass = 'top-[150px]';
  const panelShiftClass = collapsed ? 'translate-x-[calc(100%-22px)]' : 'translate-x-0';

  if (isUltra) {
    return (
      <aside className={`fixed right-0 ${panelTopClass} z-40 hidden ${panelWidthClass} xl:block`}>
        <div
          className={`relative overflow-visible rounded-[1.5rem] rounded-r-none border border-white/78 bg-[rgba(240,236,255,0.78)] text-[var(--color-primary)] shadow-[0_18px_38px_-26px_rgba(56,74,146,0.28)] backdrop-blur-3xl transition-transform duration-300 ease-out ${panelShiftClass}`}
        >
          <button
            type="button"
            aria-label={collapsed ? openLabel : closeLabel}
            onClick={() => setCollapsed((current) => !current)}
            className="absolute left-[-9px] top-1/2 z-50 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-white/90 bg-white/90 text-[#0c3d89] shadow-[0_10px_16px_-12px_rgba(0,0,0,0.24)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cf9c51]"
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d={collapsed ? 'M14 6l-6 6 6 6' : 'M10 6l6 6-6 6'}
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="px-5 pb-3 pt-4">
            <p className="max-w-[12ch] text-[0.9rem] font-semibold leading-[1.08] tracking-tight text-[#0c3d89]">{title}</p>
          </div>

          <div className="mx-4 overflow-hidden rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(49,92,159,0.96)_0%,rgba(36,69,140,0.98)_100%)] ring-1 ring-white/10 divide-y divide-white/12">
            {ultraQuickLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-4 py-[0.58rem] text-center text-[13px] font-medium text-white transition first:rounded-t-[1.2rem] last:rounded-b-[1.2rem] hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="px-4 pb-4 pt-3">
            <p className="text-center text-[1.18rem] font-semibold text-[#d39a35]">{shortcutTitle}</p>
            <div className="mt-3 space-y-[0.45rem]">
              {ultraShortcuts.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={isExternalLink(item.href) ? '_blank' : undefined}
                  rel={isExternalLink(item.href) ? 'noreferrer' : undefined}
                  className="block rounded-[1rem] border border-white/80 bg-white/95 px-3.5 py-[0.62rem] text-center text-[12px] font-semibold text-[#0c3d89] shadow-[0_8px_14px_-14px_rgba(0,0,0,0.18)] transition hover:bg-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`fixed right-0 ${panelTopClass} z-40 hidden ${panelWidthClass} xl:block`}>
      <div
        className={`relative overflow-visible rounded-[1.5rem] rounded-r-none border border-white/78 bg-[rgba(240,236,255,0.78)] text-[var(--color-primary)] shadow-[0_18px_38px_-26px_rgba(56,74,146,0.28)] backdrop-blur-3xl transition-transform duration-300 ease-out ${panelShiftClass}`}
      >
        <button
          type="button"
          aria-label={collapsed ? openLabel : closeLabel}
          onClick={() => setCollapsed((current) => !current)}
          className="absolute left-[-9px] top-1/2 z-50 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-white/90 bg-white/90 text-[#0c3d89] shadow-[0_10px_16px_-12px_rgba(0,0,0,0.24)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cf9c51]"
        >
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d={collapsed ? 'M14 6l-6 6 6 6' : 'M10 6l6 6-6 6'}
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="px-5 pb-3 pt-4">
          <h3 className="max-w-[12ch] text-[0.9rem] font-semibold leading-[1.08] tracking-tight text-[#0c3d89]">{title}</h3>
        </div>

        <div className="mx-4 overflow-hidden rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(49,92,159,0.96)_0%,rgba(36,69,140,0.98)_100%)] ring-1 ring-white/10 divide-y divide-white/12">
          {quickLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block px-4 py-[0.58rem] text-center text-[13px] font-medium text-white transition first:rounded-t-[1.2rem] last:rounded-b-[1.2rem] hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="px-4 pb-4 pt-3">
          <p className="text-center text-[1.18rem] font-semibold text-[#d39a35]">{shortcutTitle}</p>
          <div className="mt-3 space-y-[0.45rem]">
            {shortcuts.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={isExternalLink(item.href) ? '_blank' : undefined}
                rel={isExternalLink(item.href) ? 'noreferrer' : undefined}
                className="block rounded-[1rem] border border-white/80 bg-white/95 px-3.5 py-[0.62rem] text-center text-[12px] font-semibold text-[#0c3d89] shadow-[0_8px_14px_-14px_rgba(0,0,0,0.18)] transition hover:bg-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
