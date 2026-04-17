# WS Inovações

Landing page em Next.js 16 para captação de leads de consórcio, com envio para:

- WhatsApp via Evolution API
- planilha no Google Sheets via Google Apps Script
- e-mail enviado pelo próprio Google Apps Script

Neste momento o projeto está sem CRM e sem painel administrativo. A ideia é manter o fluxo simples para receber leads e organizar tudo pelo Google + WhatsApp.

As CTAs públicas de WhatsApp agora usam um link inteligente:

- desktop: `web.whatsapp.com/send`
- mobile: `wa.me`

A marca também passou a ser usada como ícone da aba, o título da guia fica apenas como `WS Inovações`, e a landing ganhou um botão flutuante de WhatsApp no canto inferior direito, exibido após a primeira seção para não cobrir a prova social do hero.

A copy do hero foi ampliada para posicionar a WS Inovações além de carro, incluindo também imóvel e investimento. A seção institucional usa `foto3.jpeg` com enquadramento responsivo mais limpo, o topo e o rodapé mostram só o nome da marca, e o simulador exibe crédito, parcela e modelo sem mostrar prazo em meses.

Nesta etapa, a landing também recebeu uma rodada mais agressiva de foco mobile: navbar menor, hero mais compacto, prova social integrada ao `#inicio` em uma faixa azul logo abaixo da imagem principal, formulário em grid denso de 2 colunas no celular, seção "Sobre" com título centralizado acima do bloco institucional, foto em recorte quadrado com rosto e nome visíveis no mobile e no desktop, FAQ com lista compacta + resposta em sheet no mobile, Instagram em carrossel com um embed por vez e setas para avançar/voltar posts, além de rodapé reorganizado em bloco curto. O desktop e o tablet foram preservados o máximo possível.

A seção do Instagram voltou a usar embed nativo oficial, agora com três posts fixos e layout mais defensivo para mobile, tablet e desktop.

A home usa offset de âncoras compatível com o menu fixo: as seções têm `scroll-margin-top` baseado na altura do cabeçalho com um respiro extra responsivo, e a navegação por hash recalcula a posição após a hidratação para parar no título visível da seção sem ficar coberta pela navbar. No mobile, o cálculo mede apenas a barra fixa do topo, não o painel aberto do menu, evitando que a seção role para o centro da tela.

No desktop, as seções seguem fluxo contínuo com altura por conteúdo e sem scroll isolado em cada seção. A exceção deliberada é o `#inicio`, que pode ocupar entre 90% e 100% da tela junto com a prova social para criar uma primeira dobra mais forte. As demais seções usam altura natural para reduzir espaços vazios e revelar o início do próximo bloco. A seção de simulação também ganhou um plano azul atrás do formulário para reforçar contraste e acabamento visual.

O rodapé é renderizado em layout próprio, sem wrapper de viewport, e o CTA final agora usa fundo escuro compacto para evitar áreas brancas sobrando no fim da página.

## Stack

- Next.js 16 App Router com Turbopack
- React 19
- Tailwind CSS v4 CSS-first
- shadcn/ui estilo `new-york`
- `motion`, `tw-animate-css`, Radix UI, React Hook Form, Zod e Sonner
- `@radix-ui/react-dialog` para o `Sheet` do FAQ mobile

## Como Rodar

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

Para validar produção local:

```bash
npm run lint
npm run build
npm run start
```

## Variáveis de Ambiente

Crie `.env.local` a partir de `.env.example`.

```bash
APPS_SCRIPT_URL="https://script.google.com/macros/s/SEU_DEPLOYMENT_ID/exec"

EVOLUTION_API_URL="https://evolution.exemplo.com"
EVOLUTION_INSTANCE="ws-inovacoes"
EVOLUTION_API_KEY="troque-esta-chave"
OWNER_PHONE="5511999999999"
```

## O Que o Lead Faz Hoje

Quando alguém envia o formulário:

1. o site envia os dados para o Google Apps Script
2. o Apps Script grava o lead na planilha
3. o Apps Script envia um e-mail para o endereço que você definir
4. o site também envia uma mensagem para o seu WhatsApp via Evolution API

Se pelo menos um destino aceitar o lead, o formulário retorna sucesso para o visitante.

## Passo a Passo Para Começar a Receber Leads

### 1. Criar a planilha no Google

1. Acesse [Google Sheets](https://sheets.google.com).
2. Crie uma nova planilha.
3. Dê um nome como `Leads WS Inovações`.
4. Copie o ID da planilha pela URL.

Exemplo:

```text
https://docs.google.com/spreadsheets/d/ESTE_E_O_ID_DA_PLANILHA/edit
```

### 2. Criar o Apps Script no seu Google

1. Com a planilha aberta, vá em `Extensões > Apps Script`.
2. Apague o conteúdo padrão.
3. Cole o conteúdo do arquivo [Code.gs](C:/Projetos/ws-inovacoes/google-apps-script/Code.gs).
4. Salve o projeto.

### 3. Configurar as Script Properties

No Apps Script, vá em `Project Settings > Script Properties` e crie:

```text
SHEET_ID=<id-da-planilha>
SHEET_NAME=Leads
NOTIFICATION_EMAIL=<o-email-onde-voce-quer-receber-os-leads>
```

Exemplo:

```text
NOTIFICATION_EMAIL=seuemail@seudominio.com
```

### 4. Publicar o Apps Script como Web App

1. Clique em `Deploy > New deployment`.
2. Escolha `Web app`.
3. Em `Execute as`, use `Me`.
4. Em `Who has access`, escolha `Anyone`.
5. Clique em `Deploy`.
6. Copie a URL gerada.

Essa URL vai para `APPS_SCRIPT_URL` no `.env.local`.

### 5. Configurar o `.env.local`

Crie o arquivo `.env.local` na raiz do projeto:

```bash
APPS_SCRIPT_URL="https://script.google.com/macros/s/SEU_DEPLOYMENT_ID/exec"

EVOLUTION_API_URL="https://evolution.exemplo.com"
EVOLUTION_INSTANCE="ws-inovacoes"
EVOLUTION_API_KEY="troque-esta-chave"
OWNER_PHONE="5511999999999"
```

### 6. Configurar o recebimento no WhatsApp

Você precisa ter a Evolution API funcionando e apontar:

- `EVOLUTION_API_URL`: URL base da sua Evolution
- `EVOLUTION_INSTANCE`: nome da instância
- `EVOLUTION_API_KEY`: chave da API
- `OWNER_PHONE`: número que vai receber os leads

Use o formato com DDI e DDD, por exemplo:

```text
5511999999999
```

### 7. Subir o site

```bash
npm run dev
```

ou, para produção:

```bash
npm run build
npm run start
```

### 8. Fazer um teste real

1. Abra o site.
2. Preencha o formulário.
3. Envie um lead de teste.
4. Confira:
   - se chegou mensagem no WhatsApp
   - se apareceu uma nova linha na planilha
   - se o e-mail foi entregue no endereço configurado em `NOTIFICATION_EMAIL`

## Onde Ajustar Se Alguma Coisa Falhar

- Google Sheets + e-mail: [Code.gs](C:/Projetos/ws-inovacoes/google-apps-script/Code.gs)
- envio principal do lead: [route.ts](C:/Projetos/ws-inovacoes/src/app/api/leads/route.ts)
- integrações do lead: [leads.ts](C:/Projetos/ws-inovacoes/src/lib/leads.ts)
- variáveis de ambiente de exemplo: [.env.example](C:/Projetos/ws-inovacoes/.env.example)

## Formulário

O formulário coleta:

- Nome
- E-mail
- WhatsApp com máscara `(99) 99999-9999`
- Modalidade do crédito
- Valor do crédito
- Parcela ideal
- Cidade/Estado

No mobile, ele passa a usar um grid denso de duas colunas para reduzir altura sem mudar a validação nem o payload enviado para `/api/leads`.

## Estratégia Mobile

- altura da navbar reduzida no celular para ampliar a viewport útil
- hero com `ViewportSectionBody` em modo mobile estrito quando cabe na viewport útil
- demais seções em altura natural, com densidade mobile ajustada para leitura rápida
- seção "Sobre" no mobile em ordem empilhada: título, texto, tópicos com ícones e foto quadrada do Diretor Comercial, com crop priorizando rosto e nome
- no desktop, a seção "Sobre" mantém layout lado a lado, mas a foto também usa o recorte quadrado para dar mais presença ao Diretor Comercial
- fallback natural preservado quando uma interação ou embed ultrapassa a altura disponível
- FAQ mobile com `Sheet`
- Instagram mobile com carrossel nativo, um post por vez e setas de avançar/voltar

## Observação

O projeto foi simplificado para operar sem CRM por enquanto. Quando você quiser migrar para Supabase depois, o melhor caminho é reaproveitar o payload atual do lead e criar uma nova camada de persistência/gestão em cima dele.
