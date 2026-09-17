import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Focus Vistos | FocusPass',
  description: 'FocusPass, o serviço de preenchimento assistido para solicitações de passaporte da Focus Vistos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
