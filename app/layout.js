import "./globals.css";

export const metadata = {
  title: "Undangan Anggun & Ilham",
  description: "Undangan Pernikahan Digital",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
