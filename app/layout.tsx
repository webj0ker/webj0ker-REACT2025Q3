import React from 'react';
import { ReactNode } from 'react';
import ClientIntlProvider from '../src/components/ClientIntlProvider/ClientIntlProvider';
import ReduxProvider from '../src/store/ReduxProvider';
import ThemeProvider from '../src/context/ThemeContext';
import nextIntlConfig from '../next-intl.config.js';

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params?: { locale?: string };
}) {
  const locale = params?.locale ?? 'en';
  let messages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch {
    messages = (await import('../messages/en.json')).default;
  }

  const timeZone = nextIntlConfig?.timeZone ?? 'UTC';

  return (
    <html lang={locale}>
      <body>
        <ClientIntlProvider locale={locale} messages={messages} timeZone={timeZone}>
          <ReduxProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </ReduxProvider>
        </ClientIntlProvider>
      </body>
    </html>
  );
}