'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const locales = ['en', 'ru'];

export default function LocaleSwitcher() {
  const pathname = usePathname();

  // Удаляем текущий языковой префикс из пути
  let pathWithoutLang = pathname?.replace(/^\/(en|ru)/, '');
  // Если результат пустой строки или только слэш, делаем путь пустым
  if (!pathWithoutLang || pathWithoutLang === '/') {
    pathWithoutLang = '';
  }

  return (
    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
      {locales.map((locale) => (
        <Link key={locale} href={`/${locale}${pathWithoutLang}`}>
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}