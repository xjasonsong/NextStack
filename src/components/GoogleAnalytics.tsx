"use client";

import Script from "next/script";
import * as gtag from "@/lib/gtag";
import { ROUTES } from "@/config/site";

export default function GoogleAnalytics() {
  // Emits in Single Page Application
  gtag.useGtag();

  // Emits when Server Side Page renders.
  return (
    <>
      {process.env.NODE_ENV !== "development" && (
        <>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <Script
            async
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            async
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gtag.GA_TRACKING_ID}', {
                        page_path: window.location.pathname,
                    });
                    gtag('config', '${gtag.AD_CONVERSION_ID}');
                    if (window.location.pathname.includes('${ROUTES.checkoutSuccess.href}')) {
                      gtag('event', 'conversion', {'send_to': '${gtag.AD_CONVERSION_ID}/${gtag.AD_CONVERSION_LABEL}'})
                    }
                    `,
            }}
          />
        </>
      )}
    </>
  );
}
