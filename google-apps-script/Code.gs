const HEADERS = [
  "createdAt",
  "name",
  "email",
  "phone",
  "modality",
  "creditValue",
  "installment",
  "city",
];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const lead = normalizeLead(payload);

    const sheet = getSheet();
    ensureHeaders(sheet);
    sheet.appendRow([
      new Date().toISOString(),
      lead.name,
      lead.email,
      lead.phone,
      lead.modality,
      lead.creditValue,
      lead.installment,
      lead.city,
    ]);

    const warning = sendNotificationEmail(lead);

    return jsonResponse({
      success: true,
      warning: warning || undefined,
    });
  } catch (error) {
    return jsonResponse({
      success: false,
      error: error && error.message ? error.message : "Erro ao processar lead.",
    });
  }
}

function normalizeLead(payload) {
  const lead = {
    name: String(payload.name || "").trim(),
    email: String(payload.email || "").trim(),
    phone: String(payload.phone || "").trim(),
    modality: String(payload.modality || "").trim(),
    creditValue: String(payload.creditValue || "").trim(),
    installment: String(payload.installment || "").trim(),
    city: String(payload.city || "").trim(),
  };

  if (
    !lead.name ||
    !lead.email ||
    !lead.phone ||
    !lead.modality ||
    !lead.creditValue ||
    !lead.installment ||
    !lead.city
  ) {
    throw new Error(
      "Campos obrigatórios: name, email, phone, modality, creditValue, installment, city.",
    );
  }

  return lead;
}

function sendNotificationEmail(lead) {
  const notificationEmail =
    PropertiesService.getScriptProperties().getProperty("NOTIFICATION_EMAIL");

  if (!notificationEmail) {
    return "NOTIFICATION_EMAIL não configurado no Apps Script.";
  }

  MailApp.sendEmail({
    to: notificationEmail,
    subject: "Novo lead - WS Inovações",
    htmlBody: buildEmailHtml(lead),
    name: "WS Inovações",
  });

  return "";
}

function buildEmailHtml(lead) {
  const rows = [
    ["Nome", lead.name],
    ["E-mail", lead.email],
    ["WhatsApp", lead.phone],
    ["Modalidade", lead.modality],
    ["Valor do crédito", lead.creditValue],
    ["Parcela ideal", lead.installment],
    ["Cidade/Estado", lead.city],
    ["Recebido em", new Date().toLocaleString("pt-BR")],
  ];

  const lines = rows
    .map(function (row) {
      return (
        "<tr>" +
        '<td style="padding:8px 12px;font-weight:600;border-bottom:1px solid #e5e7eb;">' +
        row[0] +
        "</td>" +
        '<td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">' +
        row[1] +
        "</td>" +
        "</tr>"
      );
    })
    .join("");

  return (
    '<div style="font-family:Arial,sans-serif;color:#0d1f3c;">' +
    '<h2 style="margin:0 0 16px;">Novo lead recebido pelo site</h2>' +
    '<table style="border-collapse:collapse;width:100%;max-width:640px;background:#ffffff;border:1px solid #e5e7eb;">' +
    lines +
    "</table>" +
    "</div>"
  );
}

function getSheet() {
  const properties = PropertiesService.getScriptProperties();
  const sheetId = properties.getProperty("SHEET_ID");
  const sheetName = properties.getProperty("SHEET_NAME") || "Leads";

  if (!sheetId) {
    throw new Error("Configure SHEET_ID em Script Properties.");
  }

  const spreadsheet = SpreadsheetApp.openById(sheetId);
  return spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
}

function ensureHeaders(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const needsHeaders = HEADERS.some(function (header, index) {
    return firstRow[index] !== header;
  });

  if (needsHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
