'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from '../../../src/context/useTheme';
import LocaleSwitcher from '../../../src/components/LocaleSwitcher/LocaleSwitcher';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

export default function AboutPage() {
  const t = useTranslations();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang as string;

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <div>
      <nav className='navigation-top'>
        <Link href={`/${lang}`}>{t('Home')}</Link>
        <Link href={`/${lang}/about`}>{t('About')}</Link>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
        >
          <option value="light">{t('ThemeLight')}</option>
          <option value="dark">{t('ThemeDark')}</option>
        </select>
        <LocaleSwitcher />
        <button onClick={handleRefresh}>{t('Refresh')}</button>
      </nav>
      <div className="about-container">
        <section>
          <h2>{t('AboutThisApp')}</h2>
          <p>
            Author: <strong>Stanislav Shendryk</strong>
          </p>
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
          >
            RS School React Course
          </a>
        </section>

        <section>
          <h3>{t('ContactInfo')}</h3>
          <ul>
            <li>
              Telegram:{' '}
              <a
                href="https://t.me/webJoker"
                target="_blank"
                rel="noopener noreferrer"
              >
                webJoker
              </a>
            </li>
            <li>
              Discord:{' '}
              <a
                href="https://discordapp.com/users/673500459750785065"
                target="_blank"
                rel="noopener noreferrer"
              >
                webjoker
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h3>{t('Summary')}</h3>
          <p>
            I want to fully devote myself to developing Front-end and improve it. I
            have a great desire to work and study in this area. Start my career as a
            junior software engineer.
          </p>
        </section>

        <section>
          <h3>{t('Skills')}</h3>
          <ul className="skills-list">
            <li>HTML</li>
            <li>CSS, LESS, SASS</li>
            <li>JavaScript (basic)</li>
            <li>Photoshop</li>
            <li>CorelDRAW</li>
            <li>Figma</li>
          </ul>
        </section>

        <section>
          <h3>{t('CodeExample')}</h3>
          <pre>
            <code>{`function getMin() {
  let args = Array.prototype.slice.call(arguments).sort(); 
  return args[0];
}
getMin(3, 0, -3);`}</code>
          </pre>
        </section>

        <section>
          <h3>{t('Experience')}</h3>
          <p>
            You can see it here:{' '}
            <a
              href="https://github.com/webj0ker/"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/webj0ker
            </a>
          </p>
        </section>

        <section>
          <h3>{t('Education')}</h3>
          <ul>
            <li>RS School</li>
            <li>htmlacademy</li>
            <li>EPAM</li>
          </ul>
        </section>

        <section>
          <h3>{t('English')}</h3>
          <p>Pre-Intermediate</p>
        </section>
      </div>
    </div>
  );
}







