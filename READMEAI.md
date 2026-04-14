# READMEAI - WS Inovações

## [ESTADO ATUAL]

- Projeto criado do zero em Next.js 16.2.3, React 19.2.4, TypeScript, App Router, Turbopack e Tailwind CSS v4.
- Landing page pública implementada com as seções: Hero, formulário de lead, como funciona, simulador, sobre nós, FAQ e CTA final.
- Animações de scroll isoladas em `AnimatedSection`, usando `motion/react`, `whileInView`, `viewport={{ once: true }}`, deslocamento alternado e transição de 0.6s.
- Formulário `/api/leads` coleta nome, e-mail, WhatsApp mascarado, modalidade, valor livre de crédito, valor livre de parcela ideal e cidade/estado; valida com React Hook Form + Zod.
- Endpoint `/api/leads` tenta Google Sheets, HubSpot e Evolution API em paralelo com `Promise.allSettled`; retorna sucesso se ao menos um destino aceitar e registra erros individuais no servidor.
- Área `/admin/login` e `/admin` implementada com senha simples via cookie `ADMIN_PASSWORD`.
- Dashboard administrativo lê leads do Apps Script `doGet`, exibe métricas, gráficos por dia/semana, status de conversão e tabela.
- Código Apps Script criado em `google-apps-script/Code.gs`.
- `npm run lint` e `npm run build` executados com sucesso após correção de tipagem do tooltip do gráfico.
- Dev server validado em `http://localhost:3001`: home respondeu 200, `/admin/login` respondeu 200 e `/admin` redirecionou 307 para `/admin/login?next=%2Fadmin`.
- Screenshots headless gerados em `.next/screenshots/home-desktop.png` e `.next/screenshots/home-mobile.png`; ajuste aplicado para evitar overflow horizontal no hero mobile.
- Formulário atualizado nesta sessão para layout 1 coluna mobile, 2 colunas em `md/lg`, máscara de WhatsApp, selects de modalidade/crédito/parcela, Sonner em falha total e card de sucesso.
- `npm run lint` e `npm run build` passaram após a atualização do formulário e da rota `/api/leads`.
- O site agora usa uma navbar fixa com blur, CTA de WhatsApp e `logo.png` responsivo reposicionado apenas no topo; o hero deixou de repetir a marca.
- O logo da navbar foi ampliado de forma mais agressiva, principalmente em telas grandes, para evitar aparência subdimensionada.
- A navbar passou a usar um lockup horizontal com símbolo recortado da marca e texto ao lado em `md+`, porque o logo original empilhado não funcionava bem em desktop.
- A borda clara sob a navbar foi removida para deixar o topo mais limpo.
- O simulador passou a usar os valores reais do PDF `Tabela consorcio.pdf`, em vez de estimativa por multiplicador.
- A landing foi expandida com prova social, sobre institucional, serviços, comparativo, timeline, Instagram, CTA final e footer completo, substituindo as seções antigas sobrepostas.
- A seção do Instagram agora busca os 3 posts públicos mais recentes no servidor, renderiza cards reais com imagem/caption/data e desaparece automaticamente quando o feed não retorna conteúdo.
- O conteúdo público da landing foi ajustado para remover menções ao Banco Central; a prova social agora mostra `+500 clientes`, `R$ 20M+` e `4 anos de experiência`.
- A navbar superior foi reorganizada para refletir melhor as seções atuais da página: `Simulação`, `Sobre nós`, `Serviços`, `Como funciona`, `Simulador` e `FAQ`.
- O hero agora usa a imagem local `Foto1.jpeg` e a seção `Quem está por trás da sua conquista` passou a usar `Foto2.png`.
- O enquadramento de `Foto1.jpeg` e `Foto2.png` foi ajustado com `object-position` para manter os rostos visíveis; a prova social ficou com apenas 3 números centralizados.

## [LOG DE ALTERAÇÕES]

- `package.json` / `package-lock.json`: scaffold Next.js e dependências `motion`, `recharts`, `tw-animate-css`, Radix, `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`, `react-hook-form`, `zod`, `@hookform/resolvers`, `sonner` e `@radix-ui/react-select`.
- `src/app/globals.css`: tema Tailwind v4 CSS-first com tokens da marca e sem `tailwind.config.js`.
- `src/app/page.tsx`: landing page server-rendered com imagens via `next/image` e ilhas client.
- `src/components/landing/*`: animação, formulário de captação responsivo com validação e simulador.
- `src/components/ui/*`: componentes shadcn locais necessários.
- `src/lib/leads.ts`: schema do lead e integrações paralelas Sheets/HubSpot/Evolution.
- `src/lib/admin-data.ts`: leitura server-side dos leads pelo Apps Script.
- `src/app/api/leads/route.ts`: endpoint de captação.
- `src/app/api/admin/login/route.ts` e `src/app/api/admin/logout/route.ts`: login/logout simples.
- `src/proxy.ts`: proteção de `/admin`.
- `src/app/admin/*` e `src/components/admin/*`: login e dashboard.
- `google-apps-script/Code.gs`: web app de gravação/listagem da planilha.
- `.env.example`, `README.md`, `READMEAI.md`: documentação técnica e memória do projeto.
- `src/components/ui/chart.tsx`: tooltip tipado para aceitar o payload readonly do Recharts.
- `src/components/ui/select.tsx` e `src/components/ui/sonner.tsx`: componentes shadcn locais para Select e toast.
- `google-apps-script/Code.gs`: schema da planilha atualizado para as colunas completas do novo lead.
- `src/components/landing/lead-capture-form.tsx`: modalidade atualizada para Automóvel, Imobiliário, Rural e Procedimentos Corporais; crédito/parcela agora são inputs monetários livres.
- `src/components/landing/site-navbar.tsx`: navbar fixa refinada com breakpoints do logo, CTA textual no mobile, menu hambúrguer com fechamento por clique fora e animação de altura.
- `src/app/page.tsx`: hero com `pt-20` para compensar a navbar fixa e manter o conteúdo visível sem logo duplicado.
- `src/components/landing/site-navbar.tsx`: escala do logo aumentada para `136x40`, `172x48` e `220x64` por breakpoint.
- `logo-symbol.png`: novo recorte do símbolo superior da marca para uso específico na navbar.
- `src/components/landing/site-navbar.tsx`: lockup horizontal com símbolo + wordmark para melhorar presença de marca em telas grandes.
- `src/components/landing/site-navbar.tsx`: removidas as bordas claras do header e do dropdown mobile.
- `src/components/landing/credit-simulator.tsx`: simulador trocado para uma tabela discreta de crédito x parcela baseada no PDF enviado pelo usuário.
- `src/app/page.tsx`: landing recomposta na ordem final com as novas seções e âncoras `#contato`, `#servicos`, `#sobre`, `#como-funciona` e `#faq`.
- `src/components/landing/social-proof-bar.tsx`: barra escura com 4 contadores animados por `requestAnimationFrame`.
- `src/components/landing/about-section.tsx`: nova seção institucional em 2 colunas com badges.
- `src/components/landing/services-grid.tsx`: grid de 4 serviços com cards e stagger.
- `src/components/landing/comparison-section.tsx`: tabela comparativa entre consórcio e financiamento.
- `src/components/landing/how-it-works-timeline.tsx`: timeline responsiva com 4 etapas.
- `src/components/landing/faq-section.tsx`: FAQ completo com as respostas aprovadas pelo cliente.
- `src/components/landing/instagram-feed-section.tsx`: grade de placeholders com shimmer e CTA para o Instagram.
- `src/components/landing/final-cta-banner.tsx` e `src/components/landing/site-footer.tsx`: CTA final sem imagem e footer com links rápidos/contato.
- `src/components/ui/badge.tsx`: badge local para uso em sobre e comparativo.
- `src/app/globals.css`: keyframes e classe do shimmer do Instagram.
- `src/lib/instagram.ts`: novo helper server-side para consultar o perfil público `@ws.inovacoes`, validar o payload com Zod e limitar a 3 posts.
- `src/components/landing/instagram-feed-section.tsx`: seção trocada de placeholders para cards reais do feed, com avatar, data, tipo (`Post`/`Reel`) e caption resumida.
- `src/app/page.tsx`: página pública passou a buscar o feed no servidor e só renderizar a seção quando houver posts.
- `next.config.ts`: `next/image` agora aceita imagens do CDN do Instagram/Facebook (`**.fbcdn.net`).
- `src/app/globals.css`: removido o shimmer antigo porque a seção deixou de usar placeholders.
- `src/components/landing/social-proof-bar.tsx`: prova social atualizada para `R$ 20M+`, `4 anos de experiência` e nova mensagem final sem referência ao Banco Central.
- `src/components/landing/about-section.tsx`: badge institucional trocado para uma mensagem de atendimento personalizado.
- `src/components/landing/faq-section.tsx`: resposta sobre administradora reescrita para remover menção ao Banco Central.
- `src/components/landing/site-navbar.tsx`: menu superior refeito para acompanhar as seções atuais da landing.
- `src/components/landing/site-footer.tsx`: rodapé simplificado, removendo a menção ao Banco Central no texto final.
- `src/app/page.tsx`: hero e seção sobre trocados para os assets locais `Foto1.jpeg` e `Foto2.png`.
- `src/components/landing/about-section.tsx`: prop da imagem ampliada para aceitar `StaticImageData` além de URL string.
- `src/app/page.tsx`: hero recebeu `object-position` customizado para destacar o rosto na imagem principal.
- `src/components/landing/about-section.tsx`: imagem institucional recebeu `object-position` customizado para manter os rostos no enquadramento.
- `src/components/landing/social-proof-bar.tsx`: quarto indicador removido; os 3 números restantes foram centralizados de forma responsiva.

## [BLOQUEIOS/ERROS]

- `READMEAI.md` não existia no início; foi criado nesta sessão.
- `npx create-next-app@latest` falhou no sandbox por restrição de acesso ao npm; foi executado com aprovação fora do sandbox.
- `shadcn@latest init --style new-york` falhou porque a CLI atual removeu `--style` e aceita presets `nova`, `vega`, `maia`, `lyra`, `mira`, `luma`. Para preservar o pedido, os componentes shadcn foram criados localmente com `components.json` marcado como `new-york`.
- Next.js 16 deprecia `middleware.ts` e renomeia a convenção para `proxy.ts`; como o projeto usa `src/app`, a proteção do admin foi implementada em `src/proxy.ts`.
- O primeiro `npm run build` falhou por incompatibilidade de tipos entre o payload readonly do Recharts e o componente `ChartTooltipContent`; corrigido em `src/components/ui/chart.tsx`.
- Após mover o proxy para `src/proxy.ts`, o dev server ainda usou cache antigo de `.next/dev` apontando para `proxy.ts` na raiz. O cache gerado foi limpo com verificação de caminho dentro do workspace e o redirecionamento passou.
- A primeira captura mobile mostrou texto do hero cortado por overflow horizontal; corrigido com `overflow-x` global e largura máxima menor na manchete mobile.
- Durante a atualização, o estado `isSubmitSuccessful` do React Hook Form foi evitado porque ele poderia trocar para sucesso mesmo após retorno 502 se a função de submit resolvesse. Foi usado estado explícito `isSuccess`.
- Nesta rodada, os campos `creditValue` e `installment` deixaram de ser listas pré-definidas e passaram a aceitar valor monetário livre com máscara BRL.
- O arquivo disponível da marca é um `logo.png` transparente em azul; para leitura sobre a navbar escura, foi aplicado `brightness-0 invert` no `next/image` em vez de criar um asset duplicado.
- Como a navbar fica fixa no topo, o hero precisa manter compensação de topo (`pt-20`) para evitar colisão visual entre cabeçalho e conteúdo principal.
- Os primeiros breakpoints do logo ficaram visualmente pequenos demais; a escala foi aumentada além da especificação inicial para priorizar presença de marca.
- O `logo.png` original tem muito respiro transparente e um desenho empilhado; para navbar horizontal, a solução mais eficaz foi recortar apenas o símbolo e compor o nome da empresa como texto ao lado.
- A linha branca vista abaixo do menu vinha das bordas utilitárias da navbar (`border-b` / `border-t`) e foi removida.
- O PDF `C:\Users\lithy\Downloads\Tabela consorcio.pdf` foi lido localmente e trouxe 23 faixas do Plano Acesso Auto, de R$ 45 mil a R$ 240 mil, com prazo fixo de 100 meses.
- O pacote atual de `lucide-react` não expõe um ícone `Instagram`; para o botão/rodapé foi usado `Camera` como fallback visual sem travar a build.
- O motivo de "não aparecer nada" no Instagram era estrutural: a versão anterior da seção não fazia fetch nenhum, só renderizava placeholders visuais.
- A leitura atual usa um endpoint público consumido pelo Instagram Web, então pode mudar sem aviso. Quando falha, a estratégia é esconder a seção em vez de quebrar a home.
- Os arquivos de UI em português estavam com saída mojibake no terminal do PowerShell; para evitar patches parciais inseguros, a navbar, o FAQ e o rodapé foram regravados por inteiro nesta sessão.
- Ajustes finos de crop visual exigem inspeção manual depois do build; nesta sessão o alinhamento foi corrigido por `object-position` com base nos assets locais fornecidos.

## [PRÓXIMOS PASSOS]

- Testar visualmente a navbar fixa em mobile, tablet e desktop, com atenção para o alinhamento do logo, largura do CTA de WhatsApp e abertura/fechamento do menu mobile.
- Confirmar visualmente se a nova escala do logo continua equilibrada com os links em `md` e com o botão de WhatsApp em `lg`.
- Validar se o novo lockup horizontal transmite melhor a marca em desktop e se o texto secundário continua legível sem competir com a navegação.
- Confirmar visualmente o topo sem a linha clara, em especial no desktop e no dropdown mobile.
- Se a tabela comercial mudar, atualizar primeiro `src/components/landing/credit-simulator.tsx` com os novos valores do PDF antes de mexer na copy da seção.
- Validar em navegador a nova ordem da landing, as âncoras do footer/navbar e a leitura mobile da timeline e da tabela comparativa.
- Configurar `.env.local`, publicar o Apps Script como Web App e testar um POST real de `/api/leads`.
- Ajustar os nomes dos campos HubSpot se o formulário real usar propriedades diferentes de `firstname`, `phone` e `credit`.
- Validar visualmente o bloco do Instagram no navegador e confirmar se os 3 posts atuais do perfil continuam com bom recorte de imagem e captions legíveis.
- Se a equipe quiser estabilidade máxima no Instagram, considerar migrar depois para integração oficial da Meta com credenciais próprias; a versão atual funciona sem autenticação, mas depende do payload público do web app.
- Revisar visualmente a nova navbar em desktop para confirmar se os 6 links mantêm boa leitura sem competir com o CTA de WhatsApp.
- Validar visualmente o enquadramento de `Foto1.jpeg` no hero e de `Foto2.png` na seção sobre, especialmente em mobile.
- Confirmar em navegador se o novo crop das duas fotos ficou bom também em widescreen, já que o ajuste privilegiou a visibilidade dos rostos.

## [NOTAS DE ARQUITETURA]

- A landing mantém `src/app/page.tsx` como Server Component; interatividade fica em componentes client pequenos.
- A política de sucesso do lead é: Google Sheets, HubSpot e Evolution rodam em paralelo; se qualquer destino tiver sucesso, o cliente recebe sucesso. Se todos falharem, o formulário exibe toast de erro.
- O dashboard considera conversão pela coluna `status` da planilha; novos leads entram como `Novo`, e o time pode editar manualmente para `Contatado`, `Convertido` ou outros status.
- O cookie `ADMIN_PASSWORD` armazena o valor da senha por simplicidade, conforme pedido. Não é uma autenticação robusta.
- Não criar `tailwind.config.js`; qualquer tema novo deve entrar em `@theme` no `globals.css`.
- A landing continua server-rendered em `src/app/page.tsx`, mas a navbar é um client component isolado porque controla o menu hambúrguer mobile.
- O `next/image` do logo usa dimensões intrínsecas e o tamanho visual final é controlado por classes responsivas para atender aos breakpoints sem duplicar assets.
- Para a navbar, o branding deixou de depender do logo quadrado completo e passou a usar um símbolo recortado + wordmark em texto, que se adapta melhor ao eixo horizontal.
- O comportamento de acompanhar o scroll foi garantido com `position: fixed`, porque `sticky` não se mostrou confiável no layout atual da landing.
- O simulador agora trabalha com uma lista discreta de planos reais da tabela, e não com uma fórmula contínua; por isso o slider representa índices da tabela, não valores monetários livres.
- A página pública continua como shell server em `src/app/page.tsx`; estado/animação foram isolados em componentes client pequenos para prova social, serviços, timeline e Instagram.
- O feed do Instagram foi implementado no servidor para evitar bundle/client fetch desnecessário, manter a home estática com revalidação e permitir esconder a seção inteira quando não houver posts válidos.
- Como a conta do Instagram é pública, o site consulta 3 posts mais recentes a partir do endpoint web do perfil e deixa a UI resiliente a falhas com `null` em vez de erro visível ao visitante.
- A navbar não aponta para `#instagram` porque essa seção é condicional; se o feed não vier, o link ficaria quebrado.
