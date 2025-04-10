import type { Metadata } from 'next';
import QueryProvider from './providers/QueryProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'ResumeGrader.AI',
  description: 'Helps you get your dream job by grading your resume and cover letter.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
