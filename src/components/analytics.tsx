"use client";

import Script from "next/script";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

// Google Analytics event tracking utility
export function trackGAEvent(eventName: string, eventParams: Record<string, any> = {}) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, eventParams);
  }
}

// Facebook Pixel event tracking utility
export function trackFBEvent(eventName: string, eventData: Record<string, any> = {}) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", eventName, eventData);
  }
}

// Track WhatsApp clicks
export function trackWhatsAppClick(productName?: string) {
  trackGAEvent("whatsapp_click", {
    product_name: productName || "general",
    timestamp: new Date().toISOString(),
  });
  trackFBEvent("Lead", {
    content_name: productName || "WhatsApp Order",
  });
}

// Track product views
export function trackProductView(productId: string, productName: string, price?: number) {
  trackGAEvent("view_item", {
    items: [
      {
        item_id: productId,
        item_name: productName,
        price: price,
        currency: "BDT",
      },
    ],
  });
  trackFBEvent("ViewContent", {
    content_name: productName,
    content_ids: [productId],
    currency: "BDT",
    value: price,
  });
}

// Track filter/segment changes
export function trackSegmentSelection(segment: string) {
  trackGAEvent("segment_selected", {
    segment_name: segment,
  });
  trackFBEvent("PageView", {
    content_category: "segment_selection",
    content_name: segment,
  });
}

// Track guide page views
export function trackGuideView(guideTitle: string, guideCategory: string) {
  trackGAEvent("guide_view", {
    guide_title: guideTitle,
    guide_category: guideCategory,
  });
  trackFBEvent("PageView", {
    content_category: "guide",
    content_name: guideTitle,
  });
}

export function Analytics() {
  useEffect(() => {
    // Track page views on route change (for client-side navigation)
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "page_view", {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, []);

  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_title: document.title,
                page_location: window.location.href,
                send_page_view: true,
                anonymize_ip: true,
              });

              // Custom events for tracking
              window.trackEvent = function(eventName, params) {
                gtag('event', eventName, params);
              };
            `}
          </Script>
        </>
      )}
      {FB_PIXEL_ID && (
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');

            // Track custom events for conversion monitoring
            window.trackPixelEvent = function(eventName, data) {
              fbq('track', eventName, data);
            };
          `}
        </Script>
      )}

      {/* Sentry Error Tracking (if enabled via environment) */}
      {process.env.NEXT_PUBLIC_SENTRY_DSN && (
        <Script
          src="https://browser.sentry-cdn.com/7.77.0/bundle.min.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
