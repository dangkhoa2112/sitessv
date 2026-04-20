'use client';

import { useState } from 'react';

export function FaqAccordion({
  items
}: {
  items: Array<{ id: string | number; question: string; answer: string }>;
}) {
  const [openId, setOpenId] = useState<string | number | null>(null);

  return (
    <div className="space-y-2.5">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <article key={item.id} className="subpage-glass-card rounded-2xl">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
            >
              <h3 className="text-sm font-semibold text-slate-900">{item.question}</h3>
              <span className="text-xl text-slate-500">{isOpen ? '-' : '+'}</span>
            </button>
            {isOpen ? <div className="border-t border-slate-100 px-4 py-2.5 text-sm leading-6 text-slate-600" dangerouslySetInnerHTML={{ __html: item.answer }} /> : null}
          </article>
        );
      })}
    </div>
  );
}
