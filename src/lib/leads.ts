import { z } from "zod";

import { onlyDigits } from "@/lib/utils";

const modalityOptions = [
  "Automóvel",
  "Imobiliário",
  "Rural",
  "Procedimentos Corporais",
] as const;

const leadPayloadSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().refine((value) => onlyDigits(value).length >= 10),
  modality: z.enum(modalityOptions),
  creditValue: z
    .string()
    .trim()
    .refine((value) => onlyDigits(value).length > 0),
  installment: z
    .string()
    .trim()
    .refine((value) => onlyDigits(value).length > 0),
  city: z.string().trim().min(2),
});

export type LeadPayload = z.infer<typeof leadPayloadSchema>;

export type LeadRow = {
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  modality: string;
  creditValue: string;
  installment: string;
  city: string;
  status: string;
};

export type IntegrationResult = {
  destination: "sheets" | "hubspot" | "evolution";
  ok: boolean;
  skipped?: boolean;
  error?: string;
};

type LeadValidationResult =
  | { ok: true; lead: LeadPayload }
  | { ok: false; error: string };

export function normalizeLeadPayload(input: unknown): LeadValidationResult {
  const parsed = leadPayloadSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      error: "Preencha todos os campos obrigatórios corretamente.",
    };
  }

  return {
    ok: true,
    lead: {
      ...parsed.data,
      phone: parsed.data.phone.trim(),
    },
  };
}

export async function appendLeadToSheets(
  lead: LeadPayload,
): Promise<IntegrationResult> {
  const url = process.env.APPS_SCRIPT_URL;

  if (!url) {
    return {
      destination: "sheets",
      ok: false,
      skipped: true,
      error: "APPS_SCRIPT_URL não configurada.",
    };
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    return {
      destination: "sheets",
      ok: false,
      error: `Google Sheets retornou HTTP ${response.status}.`,
    };
  }

  const data = (await response.json().catch(() => null)) as {
    success?: boolean;
    error?: string;
  } | null;

  if (!data?.success) {
    return {
      destination: "sheets",
      ok: false,
      error: data?.error || "Google Sheets não confirmou a gravação.",
    };
  }

  return { destination: "sheets", ok: true };
}

export async function submitLeadToHubSpot(
  lead: LeadPayload,
): Promise<IntegrationResult> {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formId = process.env.HUBSPOT_FORM_ID;

  if (!portalId || !formId) {
    return {
      destination: "hubspot",
      ok: false,
      skipped: true,
      error: "HubSpot não configurado.",
    };
  }

  const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: [
        { name: "firstname", value: lead.name },
        { name: "email", value: lead.email },
        { name: "phone", value: lead.phone },
        { name: "message", value: formatLeadSummary(lead) },
      ],
    }),
  });

  if (!response.ok) {
    return {
      destination: "hubspot",
      ok: false,
      error: `HubSpot retornou HTTP ${response.status}.`,
    };
  }

  return { destination: "hubspot", ok: true };
}

export async function sendEvolutionMessage(
  lead: LeadPayload,
): Promise<IntegrationResult> {
  const apiUrl = process.env.EVOLUTION_API_URL?.replace(/\/$/, "");
  const instance = process.env.EVOLUTION_INSTANCE;
  const apiKey = process.env.EVOLUTION_API_KEY;
  const ownerPhone = process.env.OWNER_PHONE;

  if (!apiUrl || !instance || !apiKey || !ownerPhone) {
    return {
      destination: "evolution",
      ok: false,
      skipped: true,
      error: "Evolution API não configurada.",
    };
  }

  const response = await fetch(
    `${apiUrl}/message/sendText/${encodeURIComponent(instance)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
      },
      body: JSON.stringify({
        number: ownerPhone,
        text: formatWhatsappMessage(lead),
      }),
    },
  );

  if (!response.ok) {
    return {
      destination: "evolution",
      ok: false,
      error: `Evolution API retornou HTTP ${response.status}.`,
    };
  }

  return { destination: "evolution", ok: true };
}

function formatLeadSummary(lead: LeadPayload) {
  return [
    `Modalidade: ${lead.modality}`,
    `Crédito: ${lead.creditValue}`,
    `Parcela ideal: ${lead.installment}`,
    `Cidade: ${lead.city}`,
  ].join("\n");
}

function formatWhatsappMessage(lead: LeadPayload) {
  return [
    "🚗 *Novo Lead - WS Inovações*",
    "",
    `👤 Nome: ${lead.name}`,
    `📧 E-mail: ${lead.email}`,
    `📱 WhatsApp: ${lead.phone}`,
    `🚘 Modalidade: ${lead.modality}`,
    `💰 Crédito: ${lead.creditValue}`,
    `💳 Parcela ideal: ${lead.installment}`,
    `📍 Cidade: ${lead.city}`,
    `📅 ${new Date().toLocaleString("pt-BR")}`,
    "",
    "👉 Painel: https://seusite.com/admin",
  ].join("\n");
}
