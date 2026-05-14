import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Undangan Anggun & Ilham",
  description: "Undangan Pernikahan Digital",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
