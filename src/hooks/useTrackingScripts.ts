import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface TrackingPixels {
  facebook_pixel_id?: string;
  google_analytics_id?: string;
  google_tag_manager_id?: string;
  tiktok_pixel_id?: string;
}

const injectScript = (id: string, content: string) => {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.innerHTML = content;
  document.head.appendChild(script);
};

const injectScriptSrc = (id: string, src: string) => {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
};

const injectNoscript = (id: string, content: string) => {
  if (document.getElementById(id)) return;
  const noscript = document.createElement("noscript");
  noscript.id = id;
  noscript.innerHTML = content;
  document.body.insertBefore(noscript, document.body.firstChild);
};

export const useTrackingScripts = () => {
  const { data } = useQuery({
    queryKey: ["tracking-pixels"],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "tracking_pixels")
        .maybeSingle();
      return (data?.value as TrackingPixels) || {};
    },
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (!data) return;

    // Facebook Pixel
    if (data.facebook_pixel_id) {
      const pid = data.facebook_pixel_id;
      injectScript(
        "fb-pixel-init",
        `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${pid}');fbq('track','PageView');`
      );
      injectNoscript(
        "fb-pixel-noscript",
        `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pid}&ev=PageView&noscript=1"/>`
      );
    }

    // Google Analytics GA4
    if (data.google_analytics_id) {
      const gid = data.google_analytics_id;
      injectScriptSrc("ga4-script", `https://www.googletagmanager.com/gtag/js?id=${gid}`);
      injectScript(
        "ga4-init",
        `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
        gtag('js',new Date());gtag('config','${gid}');`
      );
    }

    // Google Tag Manager
    if (data.google_tag_manager_id) {
      const gtmId = data.google_tag_manager_id;
      injectScript(
        "gtm-script",
        `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');`
      );
      injectNoscript(
        "gtm-noscript",
        `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
      );
    }

    // TikTok Pixel
    if (data.tiktok_pixel_id) {
      const tpid = data.tiktok_pixel_id;
      injectScript(
        "tiktok-pixel-init",
        `!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
        ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],
        ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
        for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
        ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)
        ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){
        var i="https://analytics.tiktok.com/i18n/pixel/events.js";
        ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},
        ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
        var o=document.createElement("script");o.type="text/javascript",o.async=!0,
        o.src=i+"?sdkid="+e+"&lib="+t;
        var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
        ttq.load('${tpid}');ttq.page();}(window,document,'ttq');`
      );
    }
  }, [data]);
};
