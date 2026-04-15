# WS Inovações

Landing page em Next.js 16 para captação de leads de consórcio, com envio para:

- WhatsApp via Evolution API
- planilha no Google Sheets via Google Apps Script
- e-mail enviado pelo próprio Google Apps Script

Neste momento o projeto está sem CRM e sem painel administrativo. A ideia é manter o fluxo simples para receber leads e organizar tudo pelo Google + WhatsApp.

As CTAs públicas de WhatsApp agora usam um link inteligente:

- desktop: `web.whatsapp.com/send`
- mobile: `wa.me`

A marca também passou a ser usada como ícone da aba, e a landing ganhou um botão flutuante de WhatsApp fixo no canto inferior direito.

A copy do hero foi ampliada para posicionar a WS Inovações além de carro, incluindo também imóvel e investimento.

## Stack

- Next.js 16 App Router com Turbopack
- React 19
- Tailwind CSS v4 CSS-first
- shadcn/ui estilo `new-york`
- `motion`, `tw-animate-css`, Radix UI, React Hook Form, Zod e Sonner

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

## Observação

O projeto foi simplificado para operar sem CRM por enquanto. Quando você quiser migrar para Supabase depois, o melhor caminho é reaproveitar o payload atual do lead e criar uma nova camada de persistência/gestão em cima dele.
