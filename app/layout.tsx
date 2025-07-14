import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Providers from '../components/Providers';
import { ErrorBoundary } from '../components/ErrorBoundary';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini-Commerce",
  description: "A mini e-commerce platform built with Next.js, featuring a modern UI, fast performance, and responsive design.",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="description" content="Mini-Commerce: Modern, fast, and responsive e-commerce built with Next.js." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Mini-Commerce" />
        <meta property="og:description" content="Modern, fast, and responsive e-commerce built with Next.js." />
        <meta property="og:image" content="/my-logo-full-gold.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="/my-logo-full-gold.png" />
        <meta name="twitter:title" content="Mini-Commerce" />
        <meta name="twitter:description" content="Modern, fast, and responsive e-commerce built with Next.js." />
        <meta name="twitter:image" content="/my-logo-full-gold.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Store',
          name: 'Mini-Commerce',
          description: 'Modern, fast, and responsive e-commerce built with Next.js.',
          url: 'https://mini-commerce-ofa-patrick-stackbuld-assessment.vercel.app',
          logo: '/my_icon_gold.png',
        }) }} />
        <link rel="icon" href="/my_icon_gold.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <ErrorBoundary>
          <Providers>
            <Header />
            <div className="min-h-screen flex flex-col">
              {children}
            </div>
            <Footer />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
