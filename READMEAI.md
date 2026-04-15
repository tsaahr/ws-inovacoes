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
- A aba do navegador passou a usar a marca da WS como ícone, e a home ganhou um botão flutuante de WhatsApp fixo no canto inferior direito.
- O hero deixou de falar só de carro e agora apresenta a WS com uma proposta mais ampla, cobrindo veículo, imóvel e investimento.
- `npm run lint` e `npm run build` passaram após a remoção do CRM e a simplificação do fluxo.

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
- `src/app/page.tsx`: headline e texto de apoio do hero reescritos para posicionar a marca além de consórcio de carro.
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

## [PRÓXIMOS PASSOS]

- Configurar o Apps Script com `SHEET_ID`, `SHEET_NAME` e `NOTIFICATION_EMAIL`.
- Publicar o Apps Script como Web App e colar a URL em `APPS_SCRIPT_URL`.
- Configurar a Evolution API no `.env.local`.
- Fazer um lead de teste real e validar:
  - WhatsApp
  - planilha
  - e-mail
- Validar o comportamento do link de WhatsApp em desktop e mobile real depois do deploy.
- Validar visualmente o botão flutuante de WhatsApp em mobile e desktop para confirmar que ele não cobre CTA importante nem campo do formulário.
- Revisar visualmente a nova copy do hero para confirmar quebra de linha boa em mobile e desktop.
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
- O endpoint principal de captação continua sendo [src/app/api/leads/route.ts](C:/Projetos/ws-inovacoes/src/app/api/leads/route.ts).
- O Google Apps Script é agora o ponto central do Google:
  - gravação em planilha
  - envio de e-mail
- A decisão do link de WhatsApp foi isolada em `src/components/landing/smart-whatsapp-link.tsx`; mudanças futuras nesse comportamento devem começar ali.
- O favicon da aplicação agora vem do `logo-symbol.png` via metadata em `src/app/layout.tsx`, sem depender de `favicon.ico`.
- O hero principal vive em `src/app/page.tsx`; ajustes de posicionamento de marca e promessa comercial devem começar ali.
- Se o projeto ganhar Supabase depois, a recomendação é não misturar novamente CRM + Apps Script + outro CRM externo. Escolher uma fonte principal de gestão e manter o restante como canais de notificação.
