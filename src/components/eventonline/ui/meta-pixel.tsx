import Script from "next/script";

const RAW_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
// Interpolated into an inline script: only accept a numeric id.
const PIXEL_ID = RAW_PIXEL_ID && /^\d{5,20}$/.test(RAW_PIXEL_ID) ? RAW_PIXEL_ID : undefined;

/**
 * Meta Pixel (PageView), mirroring the current landing.
 * Disabled unless NEXT_PUBLIC_META_PIXEL_ID is set, so demos never pollute production data.
 */
export function MetaPixel() {
  if (!PIXEL_ID) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
    </Script>
  );
}

type Fbq = (action: "track", event: string, params?: Record<string, unknown>) => void;

export function trackLead() {
  (globalThis as { fbq?: Fbq }).fbq?.("track", "Lead");
}
