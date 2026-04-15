import {
  normalizeLeadPayload,
  sendEvolutionMessage,
  sendLeadToGoogle,
  type IntegrationResult,
} from "@/lib/leads";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const normalized = normalizeLeadPayload(body);

  if (!normalized.ok) {
    return Response.json(
      { success: false, error: normalized.error },
      { status: 400 },
    );
  }

  const settledResults = await Promise.allSettled([
    sendLeadToGoogle(normalized.lead),
    sendEvolutionMessage(normalized.lead),
  ]);

  const integrations = settledResults.map((result, index) =>
    normalizeIntegrationResult(result, index),
  );

  const hasSuccess = integrations.some((integration) => integration.ok);

  integrations
    .filter((integration) => !integration.ok)
    .forEach((integration) => {
      console.error("[lead-capture]", integration.destination, integration.error);
    });

  integrations
    .filter((integration) => integration.warning)
    .forEach((integration) => {
      console.warn(
        "[lead-capture]",
        integration.destination,
        integration.warning,
      );
    });

  if (!hasSuccess) {
    return Response.json(
      {
        success: false,
        error:
          "Não foi possível enviar o lead para nenhum destino. Tente novamente.",
        integrations,
      },
      { status: 502 },
    );
  }

  return Response.json(
    {
      success: true,
      integrations,
    },
    { status: 200 },
  );
}

function normalizeIntegrationResult(
  result: PromiseSettledResult<IntegrationResult>,
  index: number,
): IntegrationResult {
  const destination = ["google", "evolution"][index] as
    | "google"
    | "evolution";

  if (result.status === "fulfilled") {
    return result.value;
  }

  return {
    destination,
    ok: false,
    error:
      result.reason instanceof Error
        ? result.reason.message
        : "Falha inesperada na integração.",
  };
}
