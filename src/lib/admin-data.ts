import type { LeadRow } from "@/lib/leads";

type AppsScriptLead = Partial<LeadRow> & {
  credit?: unknown;
};

export async function getAdminLeads(): Promise<{
  leads: LeadRow[];
  error?: string;
}> {
  const appsScriptUrl = process.env.APPS_SCRIPT_URL;
  const readToken = process.env.APPS_SCRIPT_READ_TOKEN;

  if (!appsScriptUrl || !readToken) {
    return {
      leads: [],
      error: "Configure APPS_SCRIPT_URL e APPS_SCRIPT_READ_TOKEN.",
    };
  }

  try {
    const endpoint = new URL(appsScriptUrl);
    endpoint.searchParams.set("token", readToken);

    const response = await fetch(endpoint.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        leads: [],
        error: `Apps Script retornou HTTP ${response.status}.`,
      };
    }

    const data = (await response.json()) as {
      success?: boolean;
      leads?: AppsScriptLead[];
      error?: string;
    };

    if (!data.success) {
      return {
        leads: [],
        error: data.error || "Apps Script não retornou sucesso.",
      };
    }

    return {
      leads: (data.leads || []).map((lead) => ({
        createdAt: String(lead.createdAt || ""),
        name: String(lead.name || ""),
        email: String(lead.email || ""),
        phone: String(lead.phone || ""),
        modality: String(lead.modality || ""),
        creditValue: String(lead.creditValue || lead.credit || ""),
        installment: String(lead.installment || ""),
        city: String(lead.city || ""),
        status: String(lead.status || "Novo"),
      })),
    };
  } catch (error) {
    return {
      leads: [],
      error:
        error instanceof Error
          ? error.message
          : "Não foi possível carregar os leads.",
    };
  }
}
