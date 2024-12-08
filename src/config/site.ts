import { Twitter, Instagram, Linkedin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const SITE = {
  name: "NextStack",
  title: "NextStack - Next.js T3 Boilerplate",
  description:
    "A stunning, production-ready boilerplate built with Next.js, T3 Stack, and shadcn/ui. Carefully crafted with modern design principles and developer experience in mind.",
  url: "https://nextsaas.live",
  address: "",
  email: "hello@nextsaas.live",
  sender: "NextSaaS <hello@nextsaas.live>",
  creator: "xjasonsong",
  keywords: [
    "Next.js boilerplate",
    "T3 Stack template",
    "shadcn/ui components",
    "Next.js 14",
    "Full-stack template",
    "TypeScript boilerplate",
    "Modern design system",
    "Authentication ready",
    "Database integration",
    "API routes",
    "Stripe integration",
    "User management",
    "Dashboard template",
    "Responsive design",
    "Dark mode",
    "Tailwind CSS",
    "tRPC",
    "Prisma ORM",
    "NextAuth.js",
    "Developer tools",
  ],
};

export const ROUTES = {
  home: {
    title: "Home",
    href: "/",
  },
  nextsaas: {
    title: "Checkout NextSaaS",
    href: "https://nextsaas.live",
  },
  dashboard: {
    title: "Dashboard",
    href: "/dashboard",
  },
  signIn: {
    title: "Get Started",
    href: "/signin",
  },
  features: {
    title: "Features",
    href: "#features",
  },
  testimonials: {
    title: "Testimonials",
    href: "#testimonials",
  },
  pricing: {
    title: "Pricing",
    href: "#pricing",
  },
  faqs: {
    title: "FAQs",
    href: "#faqs",
  },
  checkoutSuccess: {
    title: "Checkout Success",
    href: "/checkout-success",
  },
};

export const MENUS = {
  header: [
    ROUTES.nextsaas,
    ROUTES.features,
    ROUTES.testimonials,
    ROUTES.pricing,
    ROUTES.faqs,
  ],
  footer: [ROUTES.home, ROUTES.features, ROUTES.pricing, ROUTES.faqs],
};

interface SocialLink {
  icon: LucideIcon;
  label: string;
  handle: string;
  href: string;
}

export const SOCIALS: SocialLink[] = [
  {
    icon: Twitter,
    label: "Twitter",
    handle: "@xjasonsong",
    href: "https://twitter.com/xjasonsong",
  },
  {
    icon: Instagram,
    label: "Instagram",
    handle: "@xjasonsong",
    href: "https://instagram.com/xjasonsong",
  },
  {
    icon: Linkedin,
    label: "Linkedin",
    handle: "@xjasonsong",
    href: "https://linkedin.com/in/xjasonsong",
  },
];
