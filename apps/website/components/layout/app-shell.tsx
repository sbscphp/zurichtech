"use client";

import { usePathname } from "next/navigation";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-enter-motion">
      {children}
    </div>
  );
}
