import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SHINHAN_VISUALS } from '@/lib/shinhan-visuals';

type BreadcrumbItem = {
  label: string;
  href: string;
};

type EditorialIntroProps = {
  breadcrumbs: BreadcrumbItem[];
  kicker?: string;
  title: string;
  subtitle?: string;
  highlights?: string[];
  imageUrl?: string | StaticImageData;
  imageAlt?: string;
  visualLabel?: string;
  visualCopy?: string;
};

export function EditorialIntro({
  breadcrumbs,
  kicker,
  title,
  subtitle,
  highlights,
  imageUrl,
  imageAlt,
  visualLabel,
  visualCopy
}: EditorialIntroProps) {
  const resolvedImageUrl = imageUrl || SHINHAN_VISUALS.about.overview;

  return (
    <div className="subpage-editorial-shell">
      <div className="subpage-editorial-inner">
        <Breadcrumbs items={breadcrumbs} />

        <section className="subpage-editorial-hero">
          <div className="subpage-editorial-copy">
            {kicker ? <p className="subpage-editorial-kicker">{kicker}</p> : null}
            <h1 className="subpage-editorial-title">{title}</h1>
            {subtitle ? <p className="subpage-editorial-subtitle">{subtitle}</p> : null}

            {highlights?.length ? (
              <div className="subpage-editorial-chip-row">
                {highlights.map((item) => (
                  <span key={item} className="subpage-editorial-chip">
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="subpage-editorial-visual">
            <Image
              src={resolvedImageUrl}
              alt={imageAlt || title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="subpage-editorial-image"
            />
            <div className="subpage-editorial-visual-overlay">
              <p className="subpage-editorial-visual-kicker">{visualLabel || 'Corporate overview'}</p>
              {visualCopy ? <p className="subpage-editorial-visual-copy">{visualCopy}</p> : null}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
