"use client";

import * as React from "react";

type SmartWhatsAppLinkProps = Omit<
  React.ComponentPropsWithoutRef<"a">,
  "href"
> & {
  phone: string;
  message: string;
};

function buildWhatsAppHref(phone: string, message: string, useMobileUrl: boolean) {
  const text = encodeURIComponent(message);

  if (useMobileUrl) {
    return `https://wa.me/${phone}?text=${text}`;
  }

  return `https://web.whatsapp.com/send?phone=${phone}&text=${text}`;
}

function shouldUseMobileWhatsApp() {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }

  const userAgent = navigator.userAgent || navigator.vendor || "";
  const isMobileUserAgent =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(
      userAgent,
    );
  const hasCoarsePointer = window.matchMedia?.("(pointer: coarse)").matches;

  return isMobileUserAgent || Boolean(hasCoarsePointer);
}

export const SmartWhatsAppLink = React.forwardRef<
  HTMLAnchorElement,
  SmartWhatsAppLinkProps
>(function SmartWhatsAppLink(
  { phone, message, rel, target, ...props },
  ref,
) {
  const [href, setHref] = React.useState(() =>
    buildWhatsAppHref(phone, message, false),
  );

  React.useEffect(() => {
    setHref(buildWhatsAppHref(phone, message, shouldUseMobileWhatsApp()));
  }, [phone, message]);

  return (
    <a
      ref={ref}
      href={href}
      target={target ?? "_blank"}
      rel={rel ?? "noreferrer"}
      {...props}
    />
  );
});
