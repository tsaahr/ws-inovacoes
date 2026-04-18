import Image, { type StaticImageData } from "next/image";
import { BadgeCheck, Landmark } from "lucide-react";

type AboutSectionProps = {
  image: StaticImageData;
};

export function AboutSection({ image }: AboutSectionProps) {
  return (
    <div className="quem-esta-section">
      <div className="quem-esta-header">
        <p className="subtitulo-sobre">SOBRE A WS INOVAÇÕES</p>
        <h2 className="titulo-quem-esta">
          Quem está por trás da sua conquista
        </h2>
      </div>

      <div className="quem-esta-container">
        <div className="coluna-foto">
          <Image
            src={image}
            alt="Wederson Silva - Diretor Comercial"
            width={image.width}
            height={image.height}
            sizes="(max-width: 767px) 272px, (max-width: 1023px) 320px, 384px"
            className="foto-perfil"
          />
        </div>

        <div className="coluna-texto">
          <p className="paragrafo-sobre">
            Consórcios que realizam sonhos. Com 4 anos de experiência, somos
            especialistas em ajudar brasileiros a conseguir imóvel, veículos e
            máquinas agrícolas sem juros. Parcerias com as maiores administradoras
            do Brasil, atendimento personalizado e transparência em cada etapa.
          </p>

          <div className="badges-group">
            <div className="badge-item">
              <Landmark aria-hidden="true" />
              <span>Parceiros das maiores administradoras do Brasil</span>
            </div>

            <div className="badge-item">
              <BadgeCheck aria-hidden="true" />
              <span>Atendimento personalizado em cada etapa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
