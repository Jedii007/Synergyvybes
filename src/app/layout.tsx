import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { PopupWidget } from "@/components/PopupWidget";
import { Sidebar, SidebarProvider, SidebarInset, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Home, Users, Mail, Sparkles } from "lucide-react";
import ThemeChanger from "@/components/DarkSwitch";
import Link from "next/link";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";
import { LoadingProvider } from "@/context/LoadingContext";
import { sidebarButtonStyles } from "@/constants/styles";
import { Saira } from "next/font/google";

const saira = Saira({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Synergyvybes",
  description: "A home for creatives",
  icons: {
    icon: [
      { url: '/favicon.svg' },
      { url: '/synergySmall.png' }
    ],
    apple: '/synergySmall.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${saira.className} dark:text-gray-100 `}>
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
                        {/* Contact link removed - now part of About page */}
                        <SidebarMenuItem>
                          <Link href="/artist-spotlight" className="w-full">
                            <SidebarMenuButton
                              className={sidebarButtonStyles}
                              tooltip="Artist Spotlight"
                            >
                              <Sparkles className="h-8 w-8" />
                              <span>Artist Spotlight</span>
                            </SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                        {/* <div className="flex justify-center">
                          <ThemeChanger />
                        </div> */}
                      </div>
                    </SidebarMenu>
                  </div>

                  {/* Logo at Bottom */}
                  <SidebarHeader className="p-4">
                    <div className="flex items-center justify-center">
                      <Image
                        src="/synergySmall.png"
                        alt="SYNERGY Logo"
                        width={48}
                        height={48}
                        className="rounded-full object-contain"
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
            </SidebarProvider>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}