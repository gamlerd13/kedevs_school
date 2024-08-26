import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "./Theme-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Newton P.",
  description: "colegio newton paraiso lima - peru",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* This atribute: suppressHydrationWarning,  is only to no see the error about next-theme*/}
      {/* link: https://github.com/pacocoursey/next-themes#html--css*/}
      <body className={inter.className}>
        <ThemeProvider>
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
