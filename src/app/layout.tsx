import "../styles/globals.scss";
import { Providers } from "./Providers";
export const metadata = {
  title: "Entertainment App",
  icons: {
    icon: "/assets/logo.svg",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
