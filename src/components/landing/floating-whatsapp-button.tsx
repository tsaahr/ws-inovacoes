"use client";

import { cn } from "@/lib/utils";

import { SmartWhatsAppLink } from "@/components/landing/smart-whatsapp-link";

type FloatingWhatsAppButtonProps = {
  phone: string;
  message: string;
  className?: string;
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9", className)}
      fill="none"
    >
      <path
        fill="currentColor"
        d="M19.11 17.1c-.27-.13-1.6-.79-1.84-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.31.2-.58.07-.27-.13-1.13-.42-2.16-1.35-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.54.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.61-1.46-.84-2-.22-.53-.44-.45-.61-.45h-.52c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.26 0 1.33.97 2.62 1.11 2.8.13.18 1.91 2.91 4.62 4.08 2.71 1.17 2.71.78 3.2.73.49-.04 1.6-.65 1.83-1.28.22-.63.22-1.17.16-1.28-.07-.11-.25-.18-.52-.31Z"
      />
      <path
        fill="currentColor"
        d="M16.02 5.33c-5.87 0-10.62 4.72-10.62 10.54 0 1.86.49 3.68 1.41 5.28l-1.5 5.45 5.62-1.47a10.7 10.7 0 0 0 5.08 1.29c5.86 0 10.63-4.72 10.63-10.55 0-5.82-4.77-10.54-10.62-10.54Zm0 19.18a8.97 8.97 0 0 1-4.57-1.24l-.33-.2-3.33.87.89-3.23-.22-.33a8.84 8.84 0 0 1-1.38-4.7c0-4.92 4.03-8.92 8.95-8.92 4.93 0 8.95 4 8.95 8.92 0 4.93-4.02 8.93-8.96 8.93Z"
      />
    </svg>
  );
}

export function FloatingWhatsAppButton({
  phone,
  message,
  className,
}: FloatingWhatsAppButtonProps) {
  return (
    <SmartWhatsAppLink
      phone={phone}
      message={message}
      aria-label="Chamar no WhatsApp"
      className={cn(
        "fixed z-40 flex size-[3.25rem] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_rgba(37,211,102,0.38)] ring-4 ring-white/90 transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white [bottom:max(0.85rem,env(safe-area-inset-bottom))] [right:max(0.85rem,env(safe-area-inset-right))] sm:size-16 sm:[bottom:max(1rem,env(safe-area-inset-bottom))] sm:[right:max(1rem,env(safe-area-inset-right))] lg:size-[4.5rem] lg:[bottom:max(1.5rem,env(safe-area-inset-bottom))] lg:[right:max(1.5rem,env(safe-area-inset-right))]",
        className,
      )}
    >
      <WhatsAppIcon />
    </SmartWhatsAppLink>
  );
}
