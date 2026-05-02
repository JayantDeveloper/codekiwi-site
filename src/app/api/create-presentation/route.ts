import { NextResponse } from "next/server";
import { getServerSession } from "@/auth";
import { google } from "googleapis";
import { GaxiosError } from "gaxios";

const LOGO_URL = "https://www.codekiwi.app/codekiwilogo.png";

// Colors (0–1 RGB)
const GREEN = { red: 0.420, green: 0.561, blue: 0.169 }; // #6b8f2b
const WHITE = { red: 1, green: 1, blue: 1 };
const DARK  = { red: 0.102, green: 0.102, blue: 0.102 }; // #1a1a1a

// Slide dimensions (standard 16:9, EMU — 1 inch = 914400)
const SW = 9144000;
const SH = 5143500;

// Green header strip — tall enough for 2-line 32pt title
const HDR_H = 1900000;

// Logo: centered vertically in header, left-padded
const LOGO_SZ = 1143000; // 1.25"
const LOGO_X  = 228600;
const LOGO_Y  = Math.round((HDR_H - LOGO_SZ) / 2); // ≈ 378600

// Header text (to the right of the logo)
const HDR_TXT_X = LOGO_X + LOGO_SZ + 228600; // ≈ 1600200
const HDR_TXT_W = SW - HDR_TXT_X - 228600;   // ≈ 7315200

// 3-column step area
const COL_PAD  = 304800;
const COL_W    = Math.round((SW - 2 * COL_PAD) / 3); // 2844800
const COL_1_X  = COL_PAD;
const COL_2_X  = COL_PAD + COL_W;
const COL_3_X  = COL_PAD + 2 * COL_W;

const STEP_TOP  = HDR_H + 228600;             // just below header
const CIRC_SZ   = 609600;                     // 0.667" circle
const CIRC_Y    = STEP_TOP + 228600;
const circX     = (cx: number) => cx + Math.round((COL_W - CIRC_SZ) / 2);

const TXT_Y     = CIRC_Y + CIRC_SZ + 228600; // below circles
const TXT_W     = COL_W - 304800;             // 2540000
const TXT_H     = 1450000;                    // fits within slide with new header height
const txtX      = (cx: number) => cx + 152400;

// ── helpers ────────────────────────────────────────────────────────────────

function mkRect(id: string, slideId: string, x: number, y: number, w: number, h: number) {
  return {
    createShape: {
      objectId: id,
      shapeType: "RECTANGLE",
      elementProperties: {
        pageObjectId: slideId,
        size: { width: { magnitude: w, unit: "EMU" }, height: { magnitude: h, unit: "EMU" } },
        transform: { scaleX: 1, scaleY: 1, translateX: x, translateY: y, unit: "EMU" },
      },
    },
  };
}

function mkEllipse(id: string, slideId: string, x: number, y: number, sz: number) {
  return {
    createShape: {
      objectId: id,
      shapeType: "ELLIPSE",
      elementProperties: {
        pageObjectId: slideId,
        size: { width: { magnitude: sz, unit: "EMU" }, height: { magnitude: sz, unit: "EMU" } },
        transform: { scaleX: 1, scaleY: 1, translateX: x, translateY: y, unit: "EMU" },
      },
    },
  };
}

function mkTextBox(id: string, slideId: string, x: number, y: number, w: number, h: number) {
  return {
    createShape: {
      objectId: id,
      shapeType: "TEXT_BOX",
      elementProperties: {
        pageObjectId: slideId,
        size: { width: { magnitude: w, unit: "EMU" }, height: { magnitude: h, unit: "EMU" } },
        transform: { scaleX: 1, scaleY: 1, translateX: x, translateY: y, unit: "EMU" },
      },
    },
  };
}

function fillShape(id: string, color: object, contentAlignment?: string) {
  return {
    updateShapeProperties: {
      objectId: id,
      shapeProperties: {
        shapeBackgroundFill: { solidFill: { color: { rgbColor: color } } },
        outline: { propertyState: "NOT_RENDERED" },
        ...(contentAlignment ? { contentAlignment } : {}),
      },
      fields: contentAlignment
        ? "shapeBackgroundFill,outline,contentAlignment"
        : "shapeBackgroundFill,outline",
    },
  };
}

function ins(id: string, text: string) {
  return { insertText: { objectId: id, text, insertionIndex: 0 } };
}

function style(
  id: string,
  color: object,
  pt: number,
  bold = false,
  font = "Google Sans"
) {
  return {
    updateTextStyle: {
      objectId: id,
      textRange: { type: "ALL" },
      style: {
        foregroundColor: { opaqueColor: { rgbColor: color } },
        fontFamily: font,
        fontSize: { magnitude: pt, unit: "PT" },
        bold,
      },
      fields: "foregroundColor,fontFamily,fontSize,bold",
    },
  };
}

function align(id: string, alignment: string) {
  return {
    updateParagraphStyle: {
      objectId: id,
      textRange: { type: "ALL" },
      style: { alignment },
      fields: "alignment",
    },
  };
}

function addImage(slideId: string, url: string, x: number, y: number, w: number, h: number) {
  return {
    createImage: {
      url,
      elementProperties: {
        pageObjectId: slideId,
        size: { width: { magnitude: w, unit: "EMU" }, height: { magnitude: h, unit: "EMU" } },
        transform: { scaleX: 1, scaleY: 1, translateX: x, translateY: y, unit: "EMU" },
      },
    },
  };
}

// ── step builder ──────────────────────────────────────────────────────────

function buildStep(
  slideId: string,
  num: string,
  text: string,
  colX: number,
  circId: string,
  txtId: string
): object[] {
  return [
    mkEllipse(circId, slideId, circX(colX), CIRC_Y, CIRC_SZ),
    fillShape(circId, GREEN, "MIDDLE"),
    ins(circId, num),
    style(circId, WHITE, 28, true),
    align(circId, "CENTER"),
    mkTextBox(txtId, slideId, txtX(colX), TXT_Y, TXT_W, TXT_H),
    ins(txtId, text),
    style(txtId, DARK, 17),
    align(txtId, "CENTER"),
  ];
}

// ── route ─────────────────────────────────────────────────────────────────

export async function POST() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const accessToken = session.accessToken as string | undefined;
    if (!accessToken)
      return NextResponse.json(
        { error: "No Google access token. Please sign out and sign back in with Google." },
        { status: 403 }
      );

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: "v3", auth });
    const title = `CodeKiwi Session - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    const created = await drive.files.create({
      requestBody: { name: title, mimeType: "application/vnd.google-apps.presentation" },
      fields: "id, name",
    });

    const presentationId = created.data.id;
    if (!presentationId) throw new Error("Failed to create presentation — no ID returned");

    const slidesApi = google.slides({ version: "v1", auth });
    const pres = await slidesApi.presentations.get({ presentationId });
    const slide = pres.data.slides?.[0];

    if (!slide?.objectId) throw new Error("Could not locate first slide");
    const sid = slide.objectId;

    const titlePh = slide.pageElements?.find(
      (el) =>
        el.shape?.placeholder?.type === "CENTERED_TITLE" ||
        el.shape?.placeholder?.type === "TITLE"
    );
    const bodyPh = slide.pageElements?.find(
      (el) =>
        el.shape?.placeholder?.type === "BODY" ||
        el.shape?.placeholder?.type === "SUBTITLE"
    );
    const notesPh = slide.slideProperties?.notesPage?.pageElements?.find(
      (el) => el.shape?.placeholder?.type === "BODY"
    );

    const requests: object[] = [];

    // White background
    requests.push({
      updatePageProperties: {
        objectId: sid,
        pageProperties: {
          pageBackgroundFill: { solidFill: { color: { rgbColor: WHITE } } },
        },
        fields: "pageBackgroundFill",
      },
    });

    // Remove default placeholder shapes
    if (titlePh?.objectId) requests.push({ deleteObject: { objectId: titlePh.objectId } });
    if (bodyPh?.objectId)  requests.push({ deleteObject: { objectId: bodyPh.objectId } });

    // Green header strip
    requests.push(mkRect("ck_hdr", sid, 0, 0, SW, HDR_H));
    requests.push(fillShape("ck_hdr", GREEN));

    // Header: subtitle label
    requests.push(mkTextBox("ck_sub", sid, HDR_TXT_X, 342900, HDR_TXT_W, 304800));
    requests.push(ins("ck_sub", "CODEKIWI FOR GOOGLE SLIDES ADD-ON"));
    requests.push(style("ck_sub", WHITE, 13));
    requests.push(align("ck_sub", "START"));

    // Header: main headline
    requests.push(mkTextBox("ck_ttl", sid, HDR_TXT_X, 685800, HDR_TXT_W, 1100000));
    requests.push(ins("ck_ttl", "Make your coding lessons interactive!"));
    requests.push(style("ck_ttl", WHITE, 32, true));
    requests.push(align("ck_ttl", "START"));

    // Logo on top of header (rendered last = on top)
    requests.push(addImage(sid, LOGO_URL, LOGO_X, LOGO_Y, LOGO_SZ, LOGO_SZ));

    // 3 steps
    requests.push(
      ...buildStep(
        sid,
        "1",
        "Open the CodeKiwi add-on via\nExtensions → Add-ons\nin Google Slides",
        COL_1_X,
        "ck_s1c",
        "ck_s1t"
      )
    );
    requests.push(
      ...buildStep(
        sid,
        "2",
        'In Speaker Notes, type\n"Code Question:" at the top\nto mark a slide as a live\ncoding exercise',
        COL_2_X,
        "ck_s2c",
        "ck_s2t"
      )
    );
    requests.push(
      ...buildStep(
        sid,
        "3",
        "Click Start Lesson in the\nsidebar and share your PIN —\nstudents join at codekiwi.app",
        COL_3_X,
        "ck_s3c",
        "ck_s3t"
      )
    );

    // Footer
    requests.push(mkTextBox("ck_ftr", sid, 0, SH - 304800, SW, 228600));
    requests.push(ins("ck_ftr", "codekiwi.app  ·  Questions? Visit codekiwi.app/docs"));
    requests.push(style("ck_ftr", GREEN, 12));
    requests.push(align("ck_ftr", "CENTER"));

    // Speaker notes
    if (notesPh?.objectId) {
      requests.push(
        ins(
          notesPh.objectId,
          'Template slide — no coding question here.\n\nTo add a coding exercise, type "Code Question:" at the very top of any slide\'s Speaker Notes. Students will see a live code editor alongside that slide.'
        )
      );
    }

    await slidesApi.presentations.batchUpdate({
      presentationId,
      requestBody: { requests },
    });

    return NextResponse.json({
      presentationId,
      presentationUrl: `https://docs.google.com/presentation/d/${presentationId}/edit`,
      title: created.data.name,
    });
  } catch (error) {
    const err = error as GaxiosError;
    console.error("create-presentation error:", err.message);
    return NextResponse.json(
      { error: "Failed to create presentation", details: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
