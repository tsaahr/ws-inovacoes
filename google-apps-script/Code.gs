const HEADERS = [
  "createdAt",
  "name",
  "email",
  "phone",
  "modality",
  "creditValue",
  "installment",
  "city",
  "status",
];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const name = String(payload.name || "").trim();
    const email = String(payload.email || "").trim();
    const phone = String(payload.phone || "").trim();
    const modality = String(payload.modality || "").trim();
    const creditValue = String(payload.creditValue || "").trim();
    const installment = String(payload.installment || "").trim();
    const city = String(payload.city || "").trim();

    if (
      !name ||
      !email ||
      !phone ||
      !modality ||
      !creditValue ||
      !installment ||
      !city
    ) {
      return jsonResponse({
        success: false,
        error:
          "Campos obrigatorios: name, email, phone, modality, creditValue, installment, city.",
      });
    }

    const sheet = getSheet();
    ensureHeaders(sheet);
    sheet.appendRow([
      new Date().toISOString(),
      name,
      email,
      phone,
      modality,
      creditValue,
      installment,
      city,
      "Novo",
    ]);

    return jsonResponse({ success: true });
  } catch (error) {
    return jsonResponse({
      success: false,
      error: error && error.message ? error.message : "Erro ao gravar lead.",
    });
  }
}

function doGet(e) {
  try {
    const token = e && e.parameter ? e.parameter.token : "";
    const expectedToken =
      PropertiesService.getScriptProperties().getProperty("READ_TOKEN");

    if (!expectedToken || token !== expectedToken) {
      return jsonResponse({
        success: false,
        error: "Token invalido.",
      });
    }

    const sheet = getSheet();
    ensureHeaders(sheet);
    const values = sheet.getDataRange().getValues();
    const rows = values.slice(1).filter(function (row) {
      return row.some(function (cell) {
        return cell !== "";
      });
    });
    const leads = rows.map(function (row) {
      return {
        createdAt: row[0] instanceof Date ? row[0].toISOString() : String(row[0]),
        name: String(row[1] || ""),
        email: String(row[2] || ""),
        phone: String(row[3] || ""),
        modality: String(row[4] || ""),
        creditValue: String(row[5] || ""),
        installment: String(row[6] || ""),
        city: String(row[7] || ""),
        status: String(row[8] || "Novo"),
      };
    });

    return jsonResponse({ success: true, leads: leads.reverse() });
  } catch (error) {
    return jsonResponse({
      success: false,
      error: error && error.message ? error.message : "Erro ao listar leads.",
    });
  }
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
    ContentService.MimeType.JSON
  );
}
