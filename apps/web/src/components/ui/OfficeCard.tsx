export function OfficeCard({
  name,
  address,
  city,
  phone,
  email,
  workingHours,
  officeType
}: {
  name: string;
  address: string;
  city?: string;
  phone?: string;
  email?: string;
  workingHours?: string;
  officeType?: string;
}) {
  return (
    <article className="subpage-glass-card p-4">
      <h3 className="text-base font-semibold text-slate-900">{name}</h3>
      {officeType ? <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)]">{officeType}</p> : null}
      <p className="mt-1.5 text-sm text-slate-600">{address}</p>
      {city ? <p className="mt-1 text-xs text-slate-500">{city}</p> : null}
      <dl className="mt-2.5 space-y-1 text-sm text-slate-600">
        {phone ? (
          <div>
            <dt className="inline font-semibold">Phone: </dt>
            <dd className="inline">
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-[var(--color-primary)] hover:underline">
                {phone}
              </a>
            </dd>
          </div>
        ) : null}
        {email ? (
          <div>
            <dt className="inline font-semibold">Email: </dt>
            <dd className="inline">
              <a href={`mailto:${email}`} className="text-[var(--color-primary)] hover:underline">
                {email}
              </a>
            </dd>
          </div>
        ) : null}
        {workingHours ? (
          <div>
            <dt className="inline font-semibold">Hours: </dt>
            <dd className="inline">{workingHours}</dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}
