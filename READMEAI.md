# READMEAI - WS Inovações

## [ESTADO ATUAL]

- Landing page pública em Next.js 16, React 19, Tailwind CSS v4 e shadcn/ui.
- Fluxo de leads simplificado para 3 destinos práticos:
  - WhatsApp via Evolution API
  - Google Sheets via Apps Script
  - e-mail enviado pelo próprio Apps Script
- Integração com HubSpot removida.
- Área administrativa `/admin` e todo o bloco de CRM interno removidos.
- O Apps Script agora recebe o lead, grava na planilha e envia o e-mail para `NOTIFICATION_EMAIL`.
- As CTAs públicas de WhatsApp agora escolhem entre `web.whatsapp.com/send` no desktop e `wa.me` no mobile.
- A aba do navegador usa a marca da WS como ícone, e a home ganhou um botão flutuante de WhatsApp fixo no canto inferior direito.
- O hero deixou de falar só de carro e agora apresenta a WS com uma proposta mais ampla, cobrindo veículo, imóvel e investimento.
- A seção "Sobre" agora usa `foto3.jpeg` em uma estrutura própria de duas colunas, com CSS dedicado para manter a imagem inteira visível.
- O lockup textual da marca foi simplificado: navbar e rodapé mostram só `WS Inovações`, sem o subtítulo `Consultoria em Crédito`.
- O simulador mantém os valores reais da tabela, mas não exibe mais o prazo em meses.
- A landing passou por uma rodada específica de otimização para celular: hero mais compacto, CTAs com largura total no mobile, navbar mais enxuta, espaçamentos móveis recalibrados e botão flutuante respeitando safe area.
- Na seção "Sobre", a composição foi simplificada para um modelo mais previsível: foto em uma coluna, texto em outra e empilhamento no mobile.
- O carregamento da home ficou mais resiliente em mobile e em links com âncora: o hero não depende mais de esconder no primeiro paint e as seções animadas evitam ficar invisíveis quando já entram no viewport.
- A seção do Instagram agora usa embed nativo oficial com três posts fixos, carregando `https://www.instagram.com/embed.js` uma única vez e priorizando responsividade em `1 / 2 / 3` colunas conforme a largura.
- `npm run lint` e `npm run build` passaram após a remoção do CRM, a simplificação do fluxo e os ajustes visuais recentes.

## [LOG DE ALTERAÇÕES]

- `src/lib/leads.ts`: removida a integração com HubSpot; agora o backend trabalha apenas com Google Apps Script + Evolution API.
- `src/app/api/leads/route.ts`: fluxo refeito para usar somente dois destinos em paralelo (`google` e `evolution`).
- `google-apps-script/Code.gs`: reescrito para:
  - gravar o lead na planilha
  - enviar e-mail via `MailApp.sendEmail`
  - usar `NOTIFICATION_EMAIL` como destino do e-mail
- `.env.example`: removidos `HUBSPOT_*`, `APPS_SCRIPT_READ_TOKEN` e `ADMIN_PASSWORD`.
- `README.md`: refeito com passo a passo completo de configuração para receber leads.
- `src/components/landing/smart-whatsapp-link.tsx`: novo componente client para decidir o melhor link de WhatsApp conforme o dispositivo.
- `src/app/page.tsx`, `src/components/landing/site-navbar.tsx`, `src/components/landing/final-cta-banner.tsx` e `src/components/landing/site-footer.tsx`: CTAs migradas para o link inteligente de WhatsApp.
- `src/app/layout.tsx`: metadata atualizada para usar `logo-symbol.png` como ícone da aba.
- `src/components/landing/floating-whatsapp-button.tsx`: novo botão flutuante responsivo de WhatsApp com ícone próprio.
- `src/app/favicon.ico`: removido para não conflitar com o novo ícone da marca.
- `src/app/page.tsx`: hero atualizado para manter o posicionamento mais amplo da marca e passar `foto3.jpeg` para a seção institucional.
- `src/app/page.tsx`: espaçamentos mobile recalibrados, hero compactado para celular e Instagram movido para um componente server separado com `Suspense`.
- `src/components/landing/about-section.tsx`: seção sobre reescrita para seguir uma estrutura de foto + texto em colunas, com badges simples e imagem inteira visível.
- `src/app/globals.css`: adicionadas classes dedicadas da seção "Sobre" (`quem-esta-container`, `coluna-foto`, `coluna-texto`, `foto-perfil`, `badges-group`, etc.) com media query mobile.
- `src/app/page.tsx`: padding mobile da seção "Sobre" reduzido para diminuir espaços em branco.
- `src/components/landing/site-navbar.tsx`: removido o subtítulo `Consultoria em Crédito` da marca no topo.
- `src/components/landing/site-footer.tsx`: removido o subtítulo `Consultoria em Crédito` do rodapé.
- `src/components/landing/credit-simulator.tsx`: removido o card de prazo e a menção a `100 meses`.
- `src/components/landing/animated-section.tsx`: animação reestruturada para preservar conteúdo visível quando a seção já entra em viewport no carregamento ou por hash.
- `src/components/landing/instagram-feed-section.tsx`: seção do Instagram reescrita para usar embed nativo oficial com os três links fixos e layout extremamente responsivo.
- `src/components/landing/instagram-feed-server-section.tsx`: simplificado para apenas renderizar a seção client de embed, sem fetch do feed antigo.
- `src/components/landing/lead-capture-form.tsx`, `social-proof-bar.tsx`, `services-grid.tsx`, `comparison-section.tsx`, `how-it-works-timeline.tsx`, `faq-section.tsx`, `final-cta-banner.tsx`, `floating-whatsapp-button.tsx` e `site-footer.tsx`: refinados para densidade, toque e leitura melhores no mobile.
- `src/proxy.ts`: removido.
- `src/lib/admin-data.ts`: removido.
- `src/app/admin/*`: removido.
- `src/app/api/admin/*`: removido.
- `src/components/admin/*`: removido.

## [BLOQUEIOS/ERROS]

- O projeto tinha uma camada de CRM local (`/admin`) e também integração com HubSpot, o que ficou excessivo para o objetivo atual de receber leads de forma direta.
- Para evitar depender de outro provedor de e-mail, o envio por e-mail foi movido para o Google Apps Script com `MailApp`, o que simplifica bastante a operação.
- Se `NOTIFICATION_EMAIL` não estiver configurado no Apps Script, o lead ainda pode chegar em planilha e WhatsApp, mas o servidor vai registrar aviso de e-mail ausente.
- O terminal PowerShell do Windows continua mostrando alguns arquivos UTF-8 com mojibake na saída, então mudanças grandes em arquivos de documentação/UI podem ficar visualmente estranhas no terminal mesmo quando o arquivo salvo está correto.
- Quando houver CTA de WhatsApp no front, é melhor decidir por contexto de dispositivo do que por largura pura de tela; desktop usa melhor o WhatsApp Web e mobile usa melhor `wa.me`.
- Para ícone da aba, o símbolo isolado da marca funciona melhor que a versão horizontal com texto, porque continua legível em tamanhos muito pequenos.
- A copy do hero precisa manter o posicionamento amplo da marca; evitar voltar para um texto centrado só em carro enquanto a oferta cobre outras frentes.
- A `foto3.jpeg` é uma arte vertical com texto incorporado. Depois de vários testes de crop, a decisão atual é priorizar visibilidade integral da imagem usando `object-contain` e um layout mais simples.
- A seção "Sobre" deixou de depender de composições experimentais em Tailwind puro; a versão atual usa classes semânticas em CSS para facilitar futuros ajustes finos.
- `whileInView` puro com estado inicial escondido pode gerar páginas aparentemente vazias em capturas/headless e em alguns cenários de âncora. A solução atual usa controles do Motion para esconder só o que realmente começa fora do viewport.
- O embed nativo do Instagram voltou a ser a estratégia ativa. O render final continua dependendo de os posts estarem públicos, de o script externo carregar e de o navegador não bloquear conteúdo de terceiros.

## [PRÓXIMOS PASSOS]

- Validar visualmente a ordem da seção "Sobre" no mobile, caso o cliente queira texto antes da foto em vez de foto antes do texto.
- Validar se os badges da seção "Sobre" não ficam longos demais nas menores larguras; se necessário, encurtar copy ou reduzir ainda mais a densidade.
- Revisar a copy do hero com foco mobile; hoje a hierarquia está melhor, mas uma versão ligeiramente mais curta pode render ainda mais na primeira dobra.
- Fazer um lead de teste real e validar:
  - WhatsApp
  - planilha
  - e-mail
- Validar o comportamento do link de WhatsApp em desktop e mobile real depois do deploy.
- Validar visualmente o botão flutuante de WhatsApp em mobile e desktop para confirmar que ele não cobre CTA importante nem campo do formulário.
- Validar os três embeds do Instagram em mobile real e em produção/Vercel, especialmente para confirmar largura, altura e tempo de carregamento.
- Se a próxima rodada for de acabamento visual, continuar a otimização mobile começando por hero, formulário, comparação e FAQ.
- Se futuramente for criado um CRM com Supabase, começar reaproveitando o schema atual de lead em `src/lib/leads.ts`.

## [NOTAS DE ARQUITETURA]

- O payload do lead continua padronizado em:
  - `name`
  - `email`
  - `phone`
  - `modality`
  - `creditValue`
  - `installment`
  - `city`
- A lógica de integrações está centralizada em [src/lib/leads.ts](C:/Projetos/ws-inovacoes/src/lib/leads.ts).
- O endpoint principal de captação continua sendo [route.ts](C:/Projetos/ws-inovacoes/src/app/api/leads/route.ts).
- O Google Apps Script é agora o ponto central do Google:
  - gravação em planilha
  - envio de e-mail
- A decisão do link de WhatsApp foi isolada em `src/components/landing/smart-whatsapp-link.tsx`; mudanças futuras nesse comportamento devem começar ali.
- O favicon da aplicação agora vem do `logo-symbol.png` via metadata em `src/app/layout.tsx`, sem depender de `favicon.ico`.
- O hero principal vive em `src/app/page.tsx`; ajustes de posicionamento de marca e promessa comercial devem começar ali.
- A seção institucional agora usa proporções e `object-position` por breakpoint para segurar melhor fotos verticais sem criar barras de fundo visíveis.
- A seção de Instagram vive em `src/components/landing/instagram-feed-section.tsx`, com um wrapper fino em `src/components/landing/instagram-feed-server-section.tsx` só para manter a composição da home intacta.
- O comportamento de entrada das seções está centralizado em `src/components/landing/animated-section.tsx`; qualquer ajuste entre performance, visibilidade inicial e motion deve começar por esse arquivo.
- Se o projeto ganhar Supabase depois, a recomendação é não misturar novamente CRM + Apps Script + outro CRM externo. Escolher uma fonte principal de gestão e manter o restante como canais de notificação.
