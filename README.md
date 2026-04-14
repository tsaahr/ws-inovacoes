# WS Inovações

Landing page em Next.js 16 para captação de leads de consórcio de carro, com formulário integrado a Google Sheets via Apps Script, HubSpot Forms API e Evolution API para aviso por WhatsApp.

## Stack

- Next.js 16 App Router com Turbopack
- React 19
- Tailwind CSS v4 CSS-first, com tokens em `src/app/globals.css`
- shadcn/ui estilo `new-york` em componentes locais
- `tw-animate-css`, `motion`, Recharts, Radix UI, React Hook Form, Zod e Sonner

## Como Rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

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
APPS_SCRIPT_READ_TOKEN="troque-este-token"

HUBSPOT_PORTAL_ID="0000000"
HUBSPOT_FORM_ID="00000000-0000-0000-0000-000000000000"

EVOLUTION_API_URL="https://evolution.exemplo.com"
EVOLUTION_INSTANCE="ws-inovacoes"
EVOLUTION_API_KEY="troque-esta-chave"
OWNER_PHONE="5511999999999"

ADMIN_PASSWORD="troque-esta-senha"
```

## Google Apps Script

O código está em `google-apps-script/Code.gs`.

Configure Script Properties no Apps Script:

```text
SHEET_ID=<id-da-planilha>
SHEET_NAME=Leads
READ_TOKEN=<mesmo valor de APPS_SCRIPT_READ_TOKEN>
```

Publique como Web App e use a URL em `APPS_SCRIPT_URL`.

O Apps Script:

- recebe `POST { name, email, phone, modality, creditValue, installment, city }`
- grava `createdAt`, `name`, `email`, `phone`, `modality`, `creditValue`, `installment`, `city`, `status`
- define `status` inicial como `Novo`
- expõe `GET ?token=...` para o dashboard administrativo

## Rotas

- `/` landing page pública
- `/api/leads` valida o lead, tenta Google Sheets, HubSpot e Evolution API em paralelo e retorna sucesso se ao menos uma integração aceitar o envio

## Formulário

O formulário de captação coleta:

- Nome
- E-mail
- WhatsApp com máscara `(99) 99999-9999`
- Modalidade do crédito: `Automóvel`, `Imobiliário`, `Rural`, `Procedimentos Corporais`
- Valor do crédito como valor livre digitado pelo cliente
- Parcela ideal como valor livre digitado pelo cliente
- Cidade/Estado com placeholder `Ex: Rio Grande / RS`
- `/admin/login` tela de senha
- `/admin` dashboard protegido por cookie `ADMIN_PASSWORD`

Observação: no Next.js 16, o antigo `middleware.ts` foi renomeado para `proxy.ts`; por isso o gate administrativo usa `src/proxy.ts`.

## Tailwind

Este projeto não usa `tailwind.config.js`. Os tokens de marca ficam em `@theme` dentro de `src/app/globals.css`:

- `--color-brand-navy: #1a3a6b`
- `--color-brand-blue: #0099d6`
- `--color-brand-silver: #b0b8c1`
- `--color-brand-dark: #0d1f3c`

## Navegação

- Navbar fixa no topo com `bg-brand-dark/80` e `backdrop-blur-md`
- Símbolo da marca recortado e exibido com `next/image` + `brightness-0 invert`
- Lockup horizontal no tablet/desktop com símbolo + texto `WS Inovações`
- Links centrais alinhados às seções atuais da landing: `Simulação`, `Sobre nós`, `Serviços`, `Como funciona`, `Simulador` e `FAQ`
- Menu hambúrguer no mobile reaproveita os mesmos links
- CTA de WhatsApp no lado direito
- Sem borda branca sob a navbar, para manter o topo mais limpo

## Landing Page

Seções atuais da página pública:

- Hero
- `Números que comprovam`
- Formulário de contato em `#contato` com alias legado `#lead-form`
- `Sobre a WS Inovações`
- `Nossos Serviços`
- `Consórcio vs Financiamento`
- `Como funciona`
- Simulador
- FAQ
- Instagram
- CTA final
- Footer

Recursos visuais atuais:

- hero usando o asset local `Foto1.jpeg`
- seção `Sobre a WS Inovações` usando o asset local `Foto2.png`
- enquadramento das duas fotos ajustado com `object-position` para priorizar os rostos
- contadores animados na barra de prova social
- prova social atualizada para 3 números centralizados: `+500 clientes`, `R$ 20M+ em crédito aprovado` e `4 anos de experiência`
- cards de serviços com stagger
- timeline responsiva do fluxo do consórcio
- tabela comparativa com shadcn `Table`
- FAQ com `Accordion` e primeira pergunta aberta por padrão
- feed do Instagram renderizado no servidor com as 3 publicações públicas mais recentes
- seção do Instagram exibida somente quando o perfil retorna posts válidos

## Simulador

- O simulador usa a tabela do arquivo `Tabela consorcio.pdf`
- Plano utilizado: `Plano Acesso Auto`
- Taxa informada na tabela: `0,22% ao mês`
- Prazo da tabela: `100 meses`
- Faixas disponíveis atualmente: de `R$ 45.000,00` até `R$ 240.000,00`
