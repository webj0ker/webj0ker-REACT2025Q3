import Link from 'next/link';

export default function NotFound() {
  return (
    <html>
      <body>
        <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
          <h2>404 - Page Not Found</h2>
          <p>Could not find the requested page.</p>
          <Link href="/" style={{ color: 'blue' }}>
            Return Home
          </Link>
        </div>
      </body>
    </html>
  );
}