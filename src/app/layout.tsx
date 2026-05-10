import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Nav.bar";
import { ThemeProvider } from "@/app/context/Theme.context";
import StoreProvider from "./context/Store.context";
import { SidebarProvider } from "@/ui/context/Sidebar.context";
import { ActionMenuProvider } from "@/ui/context/Action.menu.context";
import { VideoProvider } from "@/ui/data/video/Video.context";

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


/*
<Video
  src="https://example.com/video.mp4"
  thumbnailUrl="https://example.com/thumb.jpg"
  title="My Video Title"
  size="lg"                        // sm | md | lg | xl | full
  showTitle
  autoPlay={false}
  loop={false}
  muted={false}
  initialVolume={0.8}
  qualities={["auto", "1080p", "720p", "480p", "360p"]}
  tracks={[
    { kind: "subtitles", src: "/subs/en.vtt", srclang: "en", label: "English", default: true }
  ]}
  minWidth="320px"
  maxWidth="960px"
  minHeight="180px"
  className="rounded-2xl shadow-2xl"      // override root
  videoClassName="rounded-xl"            // override <video>
  controlsClassName="px-4"              // override controls bar
  onPlay={() => console.log("play")}
  onPause={() => console.log("pause")}
  onEnded={() => console.log("ended")}
  onTimeUpdate={(t, d) => console.log(t, d)}
  onVolumeChange={(vol, muted) => {}}
  onQualityChange={(q) => {}}
  onFullscreenChange={(fs) => {}}
/>
 */