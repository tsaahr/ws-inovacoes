import Image, { type StaticImageData } from "next/image";
import { BadgeCheck, Landmark } from "lucide-react";

import { Badge } from "@/components/ui/badge";

type AboutSectionProps = {
  image: string | StaticImageData;
};

export function AboutSection({ image }: AboutSectionProps) {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_0.95fr] md:items-center">
      <div className="relative min-h-[380px] overflow-hidden rounded-lg md:min-h-[440px] xl:min-h-[500px]">
        <Image
          src={image}
          alt="Equipe comercial apresentando soluções de consórcio"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-[50%_16%] md:object-[50%_18%] xl:object-[50%_12%]"
        />
      </div>
      <div className="flex flex-col gap-5">
        <p className="text-sm font-semibold uppercase text-brand-blue">
          Sobre a WS Inovações
        </p>
        <h2 className="text-3xl font-semibold leading-tight text-brand-dark md:text-5xl">
          Quem está por trás da sua conquista
        </h2>
        <p className="text-lg leading-8 text-muted-foreground">
          Somos uma empresa especializada em consórcios, oferecendo as melhores
          soluções para a realização dos seus sonhos com ética, transparência e
          credibilidade. Comercializamos consórcios de Imóvel, Veículos,
          máquinas agrícolas e serviços. Com parceria com as maiores
          administradoras do Brasil, proporcionamos atendimento personalizado,
          moderno e confiável.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Badge variant="secondary" className="bg-brand-blue/10 text-brand-dark">
            <Landmark />
            Parceiros das maiores administradoras do Brasil
          </Badge>
          <Badge variant="secondary" className="bg-brand-blue/10 text-brand-dark">
            <BadgeCheck />
            Atendimento personalizado em cada etapa
          </Badge>
        </div>
      </div>
    </div>
  );
}
