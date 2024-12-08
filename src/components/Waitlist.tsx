"use client";
import * as motion from "motion/react-client";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { SITE } from "@/config/site";
import { subscribeToNewsletter } from "@/actions/subscribeToNewsletter";
import { LoadingButton } from "@/components/LoadingButton";
import { notifyWhenDone } from "@/components/Toast";
import { useDictionary } from "@/components/DirectoryProvider";
import { SOCIALS } from "@/config/site";
import Image from "next/image";

function SubmitButton() {
  const dictionary = useDictionary();

  return (
    <LoadingButton
      type="submit"
      variant="secondary"
      className="h-12 rounded-lg px-6 font-medium"
      loadingText={dictionary.common["Loading..."]}
      loadingIndicator={<Loader2 className="h-4 w-4 animate-spin" />}
      loadingIndicatorClassName="border-white"
    >
      {dictionary.common["Join Waitlist"]}
    </LoadingButton>
  );
}

export function Waitlist() {
  const dictionary = useDictionary();

  async function handleSubscribe(formData: FormData) {
    await notifyWhenDone(
      subscribeToNewsletter(formData),
      dictionary.common["Successfully joined"],
      dictionary.common["Failed to join"],
    );
  }

  return (
    <section className="relative pt-16">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-950/30 dark:to-blue-900/30" />
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-64 -top-64 h-[500px] w-[500px] animate-pulse rounded-full bg-primary/50 blur-[128px]" />
        <div className="absolute right-0 top-1/2 h-[300px] w-[300px] animate-pulse rounded-full bg-primary/50 blur-[96px]" />
        <div className="absolute bottom-0 left-1/4 h-[200px] w-[200px] animate-pulse rounded-full bg-primary/50 blur-[64px]" />
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <Badge
              variant="secondary"
              className="mb-8 rounded-full bg-foreground/5 px-4 py-2 text-sm"
            >
              {dictionary.waitlist.banner}
            </Badge>
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              {dictionary.waitlist.title}
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-foreground/50">
              {dictionary.waitlist.description}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form action={handleSubscribe} className="mx-auto mb-12 max-w-md">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Input
                  type="email"
                  name="email"
                  placeholder={dictionary.common["Email address"]}
                  required
                  className="h-12 flex-grow rounded-lg"
                />
                <SubmitButton />
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 text-center"
          >
            <div className="mb-4 flex justify-center -space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.15,
                    zIndex: 10,
                    transition: { duration: 0.2 },
                  }}
                  className="h-10 w-10 overflow-hidden rounded-full border-4 border-foreground/50 hover:border-primary"
                >
                  <Image
                    src={`/avatars/avatar-${i}.jpeg`}
                    alt={`Member ${i + 1}`}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>
            <p className="text-foreground/50">
              Join the{" "}
              <span className="font-semibold text-foreground">2,000+</span>{" "}
              members who have already signed up.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12 flex flex-wrap justify-center gap-6"
          >
            {SOCIALS.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="flex items-center gap-1 rounded-xl bg-foreground/5 px-4 py-3 transition-colors duration-200 hover:bg-foreground/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <social.icon className="h-5 w-5 text-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-foreground/50">
                    {social.label}
                  </span>
                  <span className="font-medium text-foreground">
                    {social.handle}
                  </span>
                </div>
              </a>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 text-center text-sm text-gray-500"
          >
            © {SITE.name} - {SITE.description}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
