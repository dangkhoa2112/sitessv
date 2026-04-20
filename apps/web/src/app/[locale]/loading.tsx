import { SkeletonCard } from '@/components/ui/SkeletonCard';

export default function LocaleLoading() {
  return (
    <div className="subpage-content subpage-content--wide">
      <div className="mb-6 h-10 w-1/2 animate-pulse rounded bg-slate-200" />
      <div className="grid gap-4 md:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}
