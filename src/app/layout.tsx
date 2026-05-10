import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Nav.bar";
import { ThemeProvider } from "@/app/context/Theme.context";
import StoreProvider from "./context/Store.context";
import { SidebarProvider } from "@/ui/context/Sidebar.context";
import { ActionMenuProvider } from "@/ui/context/Action.menu.context";

export const metadata: Metadata = {
  title: "Home - Gyan's",
  description:
    "This is the Home page of my portfolio website. Explore my projects, blogs, and skills. Learn about my experience and get in touch.",
  icons: {
    icon: "/icons/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('portfolio-theme');
                  var theme = (stored === 'light' || stored === 'dark') ? stored
                    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.classList.add(theme);
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ActionMenuProvider>
          <SidebarProvider>
            <ThemeProvider>
              <Navbar />
              <StoreProvider>{children}</StoreProvider>
            </ThemeProvider>
          </SidebarProvider>
        </ActionMenuProvider>
      </body>
    </html>
  );
}
