import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import ThemeProvider from "../providers/ThemeProvider";
import "./globals.css";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Rob Wynyard - Full Stack Developer",
  description: "Aspiring Full Stack Developer with expertise in JavaScript, React, and Node.js. Business owner with years of hands-on experience in IT support and property management.",
  keywords: "Rob Wynyard, Full Stack Developer, JavaScript, React, Node.js, Te Reo Māori, Mission Ready HQ",
  authors: [{ name: "Rob Wynyard" }],
  creator: "Rob Wynyard",
  publisher: "Rob Wynyard",
  openGraph: {
    title: "Rob Wynyard - Full Stack Developer",
    description: "Aspiring Full Stack Developer with expertise in JavaScript, React, and Node.js",
    url: "https://robwynyard.dev",
    siteName: "Rob Wynyard Portfolio",
    images: [
      {
        url: "/images/rob-wynyard-og.jpg",
        width: 1200,
        height: 630,
        alt: "Rob Wynyard - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rob Wynyard - Full Stack Developer",
    description: "Aspiring Full Stack Developer with expertise in JavaScript, React, and Node.js",
    images: ["/images/rob-wynyard-og.jpg"],
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
