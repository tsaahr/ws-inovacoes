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
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 rounded-lg bg-[linear-gradient(135deg,rgba(13,31,60,1),rgba(26,58,107,0.96),rgba(0,153,214,0.78))] px-4 py-12 text-center text-white sm:gap-6 sm:px-6 sm:py-16 md:px-8">
      <h2 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
        Pronto para conquistar seu carro sem pagar juros?
      </h2>
      <p className="max-w-2xl text-base leading-7 text-white/84 sm:text-lg sm:leading-8">
        Fale com um consultor agora e receba uma simulação personalizada.
      </p>
      <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
        <Button asChild size="lg" className="w-full sm:w-auto">
          <a href="#contato">Simular meu crédito</a>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="w-full border-white/70 bg-white/10 text-white hover:bg-white hover:text-brand-dark sm:w-auto"
        >
          <SmartWhatsAppLink phone={ownerPhone} message={whatsappMessage}>
            Falar no WhatsApp
          </SmartWhatsAppLink>
        </Button>
      </div>
    </div>
  );
}
