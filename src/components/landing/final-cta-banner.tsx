import { SmartWhatsAppLink } from "@/components/landing/smart-whatsapp-link";
import { Button } from "@/components/ui/button";

type FinalCtaBannerProps = {
  ownerPhone: string;
  whatsappMessage: string;
};

export function FinalCtaBanner({
  ownerPhone,
  whatsappMessage,
}: FinalCtaBannerProps) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 rounded-lg bg-[linear-gradient(135deg,rgba(13,31,60,1),rgba(26,58,107,0.96),rgba(0,153,214,0.78))] px-4 py-6 text-center text-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] sm:gap-4 sm:px-6 sm:py-8 md:px-8 md:py-10">
      <h2 className="max-w-3xl text-[1.55rem] font-semibold leading-[1.08] sm:text-3xl md:text-4xl">
        Pronto para planejar sua próxima conquista?
      </h2>
      <p className="max-w-2xl text-sm leading-6 text-white/84 sm:text-base sm:leading-7">
        Fale com um consultor e receba uma simulação personalizada para seu objetivo.
      </p>
      <div className="flex w-full flex-col justify-center gap-2.5 sm:w-auto sm:flex-row">
        <Button
          asChild
          size="lg"
          className="h-10 w-full px-4 text-sm sm:h-12 sm:w-auto sm:px-6"
        >
          <a href="#contato">Simular meu crédito</a>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="h-10 w-full border-white/70 bg-white/10 px-4 text-sm text-white hover:bg-white hover:text-brand-dark sm:h-12 sm:w-auto sm:px-6"
        >
          <SmartWhatsAppLink phone={ownerPhone} message={whatsappMessage}>
            Falar no WhatsApp
          </SmartWhatsAppLink>
        </Button>
      </div>
    </div>
  );
}
