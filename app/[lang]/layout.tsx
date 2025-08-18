import React from 'react';
import { ReactNode } from 'react';
import ClientIntlProvider from '../../src/components/ClientIntlProvider/ClientIntlProvider';
import ReduxProvider from '../../src/store/ReduxProvider';
import ThemeProvider from '../../src/context/ThemeContext';
import '../globals.css';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ru' }];
}
export const dynamicParams = false;

export default async function LocaleRootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  const locale = params.lang;
  let messages;

  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    messages = (await import('../../messages/en.json')).default;
  }

  const timeZone = 'UTC';

  // УБРАЛИ ТЕГИ <html> и <body>, ОСТАВИЛИ ТОЛЬКО ПРОВАЙДЕРЫ
  return (
    <ClientIntlProvider locale={locale} messages={messages} timeZone={timeZone}>
      <ReduxProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ReduxProvider>
    </ClientIntlProvider>
  );
}