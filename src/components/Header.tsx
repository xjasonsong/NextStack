"use client";

import Link from "next/link";
import * as motion from "motion/react-client";
import { ToggleTheme } from "@/components/ToggleTheme";
import HeaderButton from "@/components/HeaderButton";
import { MENUS, SITE } from "@/config/site";
import { useDictionary } from "@/components/DirectoryProvider";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function Header() {
  const dictionary = useDictionary();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-5 z-40 w-full"
    >
      <div className="page-container flex h-16 items-center justify-between rounded-2xl border border-secondary/50 bg-background/50 p-2 backdrop-blur-md">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Image
              src="/favicon.ico"
              alt="NextSaaS Logo"
              width={36}
              height={36}
              className="rounded-lg border border-secondary bg-gradient-to-tr from-primary via-primary/70 to-primary"
            />
          </motion.div>
          <span className="bg-gradient-to-r bg-clip-text text-xl font-bold">
            {SITE.name}
          </span>
        </Link>

        <nav className="hidden items-center space-x-6 lg:flex">
          {MENUS.header.map(({ href, title }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              {dictionary.common[title as keyof typeof dictionary.common]}
            </Link>
          ))}
          <ToggleTheme />
          <HeaderButton />
        </nav>
        <button
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>

        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 right-0 top-20 z-50 rounded-lg border border-secondary/50 bg-background/95 p-4 backdrop-blur-sm lg:hidden"
          >
            <nav className="flex flex-col space-y-4">
              {MENUS.header.map(({ href, title }) => (
                <Link
                  key={href}
                  href={href}
                  className="group relative flex px-3 py-2 text-sm font-semibold text-muted-foreground transition-all hover:scale-105 hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative">
                    {dictionary.common[title as keyof typeof dictionary.common]}
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-primary to-primary/50 transition-all duration-300 ease-out group-hover:w-full" />
                  </span>
                </Link>
              ))}
              <div className="flex items-center justify-between border-t pt-4">
                <ToggleTheme />
                <HeaderButton />
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
