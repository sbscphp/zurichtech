"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { BrandLogo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/site/content";
import { cn } from "@/lib/utils";

/**
 * Site header (Figma node 268:12670). Copy and structure are hardcoded
 * ahead of the Sanity wiring that follows in a later phase.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0px_17px_17px_-7px_rgba(241,241,241,0.04),0px_36px_28px_-7px_rgba(190,185,185,0.1)]">
      <div className="mx-auto flex h-[88px] w-full max-w-[1440px] items-center justify-between px-6 lg:h-[120px] lg:px-20">
        <BrandLogo />

        <nav className="hidden h-full items-center lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              active={isActive(pathname, link.href)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild variant="brand" size="xl" className="font-body">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex size-10 items-center justify-center rounded-lg border border-line lg:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-line bg-white lg:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  active={isActive(pathname, link.href)}
                  className="block py-2"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-3">
              <Button asChild variant="brand" size="xl" className="w-full font-body">
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Contact Us
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function NavLink({
  href,
  active,
  className,
  children,
  onClick,
}: {
  href: string;
  active: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex h-full items-center justify-center px-5 font-body text-xl leading-[1.4] whitespace-nowrap transition-colors hover:text-ink",
        active ? "text-ink font-medium" : "text-ink-dimmed",
        className,
      )}
    >
      {children}
    </Link>
  );
}
