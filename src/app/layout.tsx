import type { Metadata } from "next";
import { Saira } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { PopupWidget } from "@/components/PopupWidget";
import { Sidebar, SidebarProvider, SidebarInset, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Home, Users, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";
import { LoadingProvider } from "@/context/LoadingContext";
import { sidebarButtonStyles } from "@/constants/styles";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';

const saira = Saira({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Synergyvybes - Creative Collective",
    template: "%s | Synergyvybes"
  },
  description: "A creative sanctuary where artists and visionaries connect, collaborate, and showcase their brilliance. Join our community of innovative creators.",
  icons: {
    icon: [
      { url: '/favicon.svg' },
      { url: '/synergySmall.png' }
    ]
  },
  keywords: ["creative collective", "artists", "music", "afro-fusion", "alté", "gambia", "sierra leone", "nigeria", "art", "music", "creative"],
  authors: [{ name: "Synergyvybes" }],
  creator: "Synergyvybes",
  publisher: "Synergyvybes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://synergyvybes.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://synergyvybes.com',
    siteName: 'Synergyvybes',
    title: 'Synergyvybes - Creative Collective',
    description: 'A creative sanctuary where artists and visionaries connect, collaborate, and showcase their brilliance.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Synergyvybes Creative Collective',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Synergyvybes - Creative Collective',
    description: 'A creative sanctuary where artists and visionaries connect, collaborate, and showcase their brilliance.',
    images: ['/twitter-image.jpg'],
    creator: '@synergyvybes',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // verification: {
  //   google: 'your-google-site-verification',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#e68531" />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2541871874971595"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${saira.className} dark:text-gray-100 min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b6300] to-[#24243e] bg-fixed`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <LoadingProvider>
            <SidebarProvider>
              <LoadingSpinner />
              <Sidebar className="border-r border-[#e68531]/20">
                <SidebarContent className="flex flex-col h-full">
                  {/* Centered Navigation Links */}
                  <div className="flex-1 flex items-center justify-center">
                    <SidebarMenu className="w-full">
                      <div className="space-y-8 w-full px-4">
                        <SidebarMenuItem>
                          <Link href="/" className="w-full">
                            <SidebarMenuButton
                              className={sidebarButtonStyles}
                              tooltip="Home"
                            >
                              <Home className="h-8 w-8" />
                              <span>Synergy</span>
                            </SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <Link href="/artistes" className="w-full">
                            <SidebarMenuButton
                              className={sidebarButtonStyles}
                              tooltip="Artistes"
                            >
                              <Users className="h-8 w-8" />
                              <span>Artistes</span>
                            </SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                        {/* <SidebarMenuItem>
                          <Link href="/vybetalks" className="w-full">
                            <SidebarMenuButton
                              className={sidebarButtonStyles}
                              tooltip="VybeTalks"
                            >
                              <Sparkles className="h-8 w-8" />
                              <span>VybeTalks</span>
                            </SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem> */}
                        <SidebarMenuItem>
                          <Link href="/about" className="w-full">
                            <SidebarMenuButton
                              className={sidebarButtonStyles}
                              tooltip="About"
                            >
                              <Users className="h-8 w-8" />
                              <span>About</span>
                            </SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                      </div>
                    </SidebarMenu>
                  </div>

                  {/* Logo at Bottom */}
                  <SidebarHeader className="mb-10">
                    <div className="flex items-center justify-center">
                      <Image
                        src="/Synergyvybes.png"
                        alt="SYNERGY Logo"
                        width={100}
                        height={100}
                        className="rounded-full "
                      />
                    </div>
                  </SidebarHeader>
                </SidebarContent>
              </Sidebar>

              <SidebarInset>
                <div className="fixed top-1/2 z-50">
                  <SidebarTrigger className="text-[#e68531] hover:bg-[#e68531]/10" />
                </div>
                {children}
              </SidebarInset>
              <PopupWidget />
              <Analytics />
              <SpeedInsights />
            </SidebarProvider>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}