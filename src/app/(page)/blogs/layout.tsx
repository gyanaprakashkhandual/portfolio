"use client";

import Sidebar from "./components/Blog.sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[calc(100vh-56px)] bg-white dark:bg-gray-900 flex">
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>
      <main className="flex-1 min-w-0 px-8 pt-2 pb-2 overflow-y-auto">{children}</main>
    </div>
  );
}
