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

export type IntegrationResult = {
  destination: "google" | "evolution";
  ok: boolean;
  skipped?: boolean;
  error?: string;
  warning?: string;
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

export async function sendLeadToGoogle(
  lead: LeadPayload,
): Promise<IntegrationResult> {
  const url = process.env.APPS_SCRIPT_URL;

  if (!url) {
    return {
      destination: "google",
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
      destination: "google",
      ok: false,
      error: `Google Apps Script retornou HTTP ${response.status}.`,
    };
  }

  const data = (await response.json().catch(() => null)) as
    | {
        success?: boolean;
        error?: string;
        warning?: string;
      }
    | null;

  if (!data?.success) {
    return {
      destination: "google",
      ok: false,
      error: data?.error || "Google Apps Script não confirmou o recebimento.",
    };
  }

  return {
    destination: "google",
    ok: true,
    warning: data.warning,
  };
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
  ].join("\n");
}
