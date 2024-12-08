import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { env } from "@/env";

export const GA_TRACKING_ID = env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? "";
export const AD_CONVERSION_ID = env.NEXT_PUBLIC_GOOGLE_AD_CONVERSION_ID ?? "";
export const AD_CONVERSION_LABEL =
  env.NEXT_PUBLIC_GOOGLE_AD_CONVERSION_LABEL ?? "";

export const pageview = (url: URL) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// Use this to track events as needed
// For example:
// event('sign_in', {
//   event_category: 'authentication',
//   event_label: 'google_signin',
//   value: 1
// });
export const event = (
  action: Gtag.EventNames,
  { event_category, event_label, value }: Gtag.EventParams,
) => {
  window.gtag("event", action, {
    event_category,
    event_label,
    value,
  });
};

export const useGtag = () => {
  const pathname = usePathname(); // Get current route

  // Save pathname on component mount into a REF
  const savedPathNameRef = useRef(pathname);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;

    const handleRouteChange = (url: URL) => {
      pageview(url);
    };

    if (savedPathNameRef.current !== pathname && pathname) {
      handleRouteChange(new URL(pathname, window.location.origin));
      // Update REF
      savedPathNameRef.current = pathname;
    }
  }, [pathname]);
};
