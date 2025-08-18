'use client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const AVAILABLE_LOCALES = ['en', 'ru'];
const DEFAULT_LOCALE = 'en';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname() ?? '/';
  const searchParams = useSearchParams();
  const locale = useLocale();

  const queryString = searchParams?.toString() ?? '';

  function buildTarget(nextLocale: string) {
    const segments = pathname.split('/').filter(Boolean);
    const hasLocale = segments.length > 0 && AVAILABLE_LOCALES.includes(segments[0]);
    const restSegments = hasLocale ? segments.slice(1) : segments;
    const restPath = restSegments.length ? `/${restSegments.join('/')}` : '';
    let targetPath: string;
    if (nextLocale === DEFAULT_LOCALE) {
      targetPath = restPath || '/';
    } else {
      targetPath = restPath ? `/${nextLocale}${restPath}` : `/${nextLocale}`;
    }
    const search = queryString ? `?${queryString}` : '';
    return `${targetPath}${search}`;
  }

  return (
    <div>
      {AVAILABLE_LOCALES.map((l) => (
        <button
          key={l}
          onClick={() => {
            const target = buildTarget(l);
            router.push(target);
          }}
          aria-pressed={locale === l}
          style={{ marginLeft: 8, fontWeight: locale === l ? 600 : 400 }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}