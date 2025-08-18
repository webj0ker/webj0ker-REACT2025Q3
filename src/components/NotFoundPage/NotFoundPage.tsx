'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFoundPage() {
  const t = useTranslations('NotFound');

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>
      <Link href="/" style={{ color: 'blue' }}>
        {t('returnHome')}
      </Link>
    </div>
  );
}