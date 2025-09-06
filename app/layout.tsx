import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Vizard Clone',
  description: 'AI Video Editor Clone',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar">
      <body className="bg-gray-50">
        <main>{children}</main>
      </body>
    </html>
  );
}
