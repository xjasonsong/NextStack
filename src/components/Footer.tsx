"use client";

import { Separator } from "@/components/ui/separator";
import { MENUS, SITE, SOCIALS } from "@/config/site";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { subscribeToNewsletter } from "@/actions/subscribeToNewsletter";
import { LoadingButton } from "@/components/LoadingButton";
import { notifyWhenDone } from "@/components/Toast";
import { useDictionary } from "@/components/DirectoryProvider";

export const Footer = () => {
  const social = SOCIALS[0]!;
  const dictionary = useDictionary();

  return (
    <footer id="footer" className="relative">
      {/* Content */}
      <div className="relative">
        <div className="page-container py-24 sm:py-32">
          <div className="space-y-12">
            <div className="grid gap-16 lg:grid-cols-12">
              {/* Logo and description section */}
              <div className="space-y-8 lg:col-span-4">
                <Link
                  href="/"
                  className="group inline-flex items-center space-x-3"
                >
                  <Image
                    src="/favicon.ico"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="rounded-md transition-transform group-hover:scale-110"
                  />
                  <span className="bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-2xl font-bold">
                    {SITE.name}
                  </span>
                </Link>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  {SITE.description}
                </p>
                <div className="space-y-4">
                  <Link
                    href="#"
                    className="inline-flex items-center space-x-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    <span>LEAVE US A </span>
                    <span className="text-primary underline">TESTIMONIAL</span>
                    <span role="img" aria-label="heart">
                      ❤️
                    </span>
                  </Link>
                </div>
              </div>

              {/* Resources Column */}
              <div className="grid grid-cols-2 gap-12 lg:col-span-5">
                <div className="space-y-6">
                  <h3 className="font-bold tracking-wide text-muted-foreground">
                    {dictionary.common.RESOURCES}
                  </h3>
                  <ul className="space-y-4">
                    {MENUS.footer.map((menu) => (
                      <li key={menu.title}>
                        <Link
                          href={menu.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          {menu.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pages Column */}
                <div className="space-y-6">
                  <h3 className="font-bold tracking-wide text-muted-foreground">
                    {dictionary.common.PAGES}
                  </h3>
                  <ul className="space-y-4">
                    {["Privacy Policy", "Terms & Conditions"].map((item) => (
                      <li key={item}>
                        <Link
                          href="#"
                          className="text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Newsletter section */}
              <div className="space-y-6 lg:col-span-3">
                <h3 className="font-bold tracking-wide text-muted-foreground">
                  {dictionary.common.NEWSLETTER}
                </h3>
                <div className="space-y-3">
                  <label
                    htmlFor="email"
                    className="text-sm text-muted-foreground"
                  >
                    {dictionary.common["Email address"]}
                  </label>
                  <form
                    action={async (formData) => {
                      await notifyWhenDone(
                        subscribeToNewsletter(formData),
                        dictionary.common["Successfully joined"],
                        dictionary.common["Failed to join"],
                      );
                    }}
                    className="space-y-2"
                  >
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder={dictionary.common["Email address"]}
                      required
                      className="bg-background/50"
                    />
                    <LoadingButton
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      loadingText={dictionary.common["Loading..."]}
                    >
                      {dictionary.common.Subscribe}
                    </LoadingButton>
                  </form>
                </div>
              </div>
            </div>
            <Separator className="bg-border/40" />
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="text-sm text-muted-foreground">
                Copyright © 2024{" "}
                <Link href="/" className="text-primary hover:text-primary/90">
                  {SITE.name}
                </Link>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <span className="text-muted-foreground/70">
                  Built & designed by
                </span>
                <Link
                  href={social.href}
                  className="group inline-flex items-center space-x-2 rounded-full border border-border/40 bg-gradient-to-b from-background to-secondary/30 px-3 py-1 shadow-sm transition-all duration-200 hover:border-border/80 hover:bg-secondary/50 hover:shadow-md"
                >
                  <Image
                    src={`/avatars/${social.handle}.jpg`}
                    alt={social.label}
                    className="h-10 w-10 rounded-full ring-1 ring-background transition-transform group-hover:scale-110"
                    width={40}
                    height={40}
                  />
                  <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-sm font-medium text-transparent">
                    {social.handle}
                  </span>
                  <svg
                    className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
