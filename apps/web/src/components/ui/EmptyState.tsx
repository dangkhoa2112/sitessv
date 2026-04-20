export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="subpage-glass-card border-dashed border-[#bfd7e9] bg-[#f7fbff] p-6 text-center">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1.5 text-sm text-slate-600">{description}</p>
    </div>
  );
}
