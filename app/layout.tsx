import "./globals.css";

export const metadata = {
  title: "OMAL",
  description: "منصة طلب عمال وخدمات سريعة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}