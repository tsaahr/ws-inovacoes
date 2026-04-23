const SITE_BLOCKED = true;

const BLOCKED_PAGE = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex,nofollow" />
    <title>WS Inovacoes</title>
    <style>
      :root {
        color-scheme: light;
        font-family:
          Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
          "Segoe UI", sans-serif;
        background: #0d1f3c;
        color: #ffffff;
      }

      * {
        box-sizing: border-box;
      }

      body {
        min-height: 100svh;
        margin: 0;
        display: grid;
        place-items: center;
        padding: 24px;
        background:
          radial-gradient(circle at top left, rgba(64, 132, 224, 0.28), transparent 36rem),
          #0d1f3c;
      }

      main {
        width: min(100%, 520px);
        text-align: center;
      }

      p {
        margin: 0;
        color: rgba(255, 255, 255, 0.76);
        font-size: 1rem;
        line-height: 1.7;
      }

      h1 {
        margin: 0 0 12px;
        font-size: clamp(2rem, 8vw, 4rem);
        line-height: 1;
        font-weight: 700;
        letter-spacing: 0;
      }

      .brand {
        margin-bottom: 18px;
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Site indisponivel</h1>
    </main>
  </body>
</html>`;

export function proxy() {
  if (!SITE_BLOCKED) {
    return;
  }

  return new Response(BLOCKED_PAGE, {
    status: 503,
    headers: {
      "cache-control": "no-store, no-cache, max-age=0, must-revalidate",
      "content-type": "text/html; charset=utf-8",
      "retry-after": "3600",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)",
  ],
};
