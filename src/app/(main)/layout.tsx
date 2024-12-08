import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type { Viewport, Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { SessionProvider } from "next-auth/react";
import DictionaryProvider from "@/components/DirectoryProvider";
import { getDictionary } from "@/server/dictionary";
import Analytics from "@/components/Analytics";
import Toast from "@/components/Toast";
import { SITE } from "@/config/site";
const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  keywords: SITE.keywords,
  authors: [
    {
      name: SITE.creator,
      url: SITE.name,
    },
  ],
  creator: SITE.creator,
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
    creator: SITE.creator,
  },
  icons: {
    shortcut: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
    ],
  },
  verification: {
    google: null,
    yandex: null,
    yahoo: null,
    other: {
      "msvalidate.01": "",
      "facebook-domain-verification": "",
    },
  },
  category: "technology",
};

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const dictionary = await getDictionary();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <GoogleAnalytics />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          inter.className,
        )}
      >
        <DictionaryProvider dictionary={dictionary}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>
              <SessionProvider>
                {children}
                <Analytics />
                <Toast />
              </SessionProvider>
            </TRPCReactProvider>
          </ThemeProvider>
        </DictionaryProvider>
      </body>
    </html>
  );
}
