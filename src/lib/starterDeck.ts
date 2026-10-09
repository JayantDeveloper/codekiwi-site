// CodeKiwi-branded starter deck, described once as a layout spec and rendered
// two ways: to Google Slides API requests (create-presentation route) and to
// HTML (a local preview), so what we review is what teachers get.
//
// Coordinates are in px on a 960 x 540 canvas (a 10in x 5.625in slide at
// 96 px/in); toEmu() converts. Font sizes are in pt, as Slides uses.

import {
  EXERCISES,
  LANGUAGE_LABEL,
  hintFor,
  notesFor,
  type Exercise,
  type StarterLanguage,
} from "./starterExercises";

export const LOGO_URL = "https://www.codekiwi.app/codekiwilogo.png";

export const COLORS = {
  forest: "#24391a", // title/end background
  forestSoft: "#2f4a1a",
  green: "#6b8f2b", // brand green
  lime: "#a8d05f",
  limeBright: "#c6ec7f",
  mint: "#eef6dd",
  cream: "#fbfdf6",
  ink: "#1f2a12",
  body: "#3d4a2a",
  muted: "#6b7a52",
  code: "#1e1e1e",
  codeText: "#e6e6e6",
  codeMuted: "#8a9a70",
  white: "#ffffff",
} as const;

export const FONTS = {
  heading: "Poppins",
  body: "Inter",
  mono: "Roboto Mono",
} as const;

type Align = "START" | "CENTER" | "END";
type VAlign = "TOP" | "MIDDLE" | "BOTTOM";

export type El =
  | { type: "rect" | "round" | "ellipse"; x: number; y: number; w: number; h: number; fill: string }
  | {
      type: "text";
      x: number;
      y: number;
      w: number;
      h: number;
      text: string;
      font: string;
      weight?: number;
      size: number; // pt
      color: string;
      align?: Align;
      valign?: VAlign;
      lineSpacing?: number; // percent, 100 = single
    }
  | { type: "image"; x: number; y: number; w: number; h: number; url: string };

export type SlideSpec = { bg: string; elements: El[]; notes: string };

// ── slide builders ───────────────────────────────────────────────────────────

/** The pixel-art mascot in a crisp square frame (the art itself is square). */
function mascot(x: number, y: number, size: number, frame: string): El[] {
  const b = Math.round(size * 0.045);
  return [
    { type: "rect", x: x - b, y: y - b, w: size + 2 * b, h: size + 2 * b, fill: frame },
    { type: "image", x, y, w: size, h: size, url: LOGO_URL },
  ];
}

function brandFooter(dark: boolean): El[] {
  return [
    { type: "image", x: 48, y: 486, w: 30, h: 30, url: LOGO_URL },
    {
      type: "text", x: 82, y: 486, w: 160, h: 30, text: "CodeKiwi",
      font: FONTS.heading, weight: 700, size: 13, color: dark ? COLORS.lime : COLORS.green, valign: "MIDDLE",
    },
  ];
}

function titleSlide(language: StarterLanguage): SlideSpec {
  const label = LANGUAGE_LABEL[language];
  return {
    bg: COLORS.forest,
    elements: [
      // Soft decorative circles, top right
      { type: "ellipse", x: 610, y: -170, w: 520, h: 520, fill: COLORS.forestSoft },
      { type: "ellipse", x: 760, y: 330, w: 300, h: 300, fill: COLORS.forestSoft },
      ...mascot(684, 128, 200, COLORS.lime),
      {
        type: "text", x: 48, y: 120, w: 560, h: 30, text: "CODEKIWI STARTER DECK",
        font: FONTS.heading, weight: 700, size: 13, color: COLORS.lime,
      },
      {
        type: "text", x: 48, y: 150, w: 600, h: 76, text: label,
        font: FONTS.heading, weight: 700, size: 46, color: COLORS.white, valign: "BOTTOM",
      },
      {
        type: "text", x: 48, y: 218, w: 600, h: 76, text: "Warm-Ups",
        font: FONTS.heading, weight: 700, size: 46, color: COLORS.lime, valign: "TOP",
      },
      {
        type: "text", x: 48, y: 304, w: 560, h: 70,
        text: `${EXERCISES.length} live coding exercises. Write your code, run it, and see instantly if it passes.`,
        font: FONTS.body, size: 16, color: "#cfe3a8", lineSpacing: 120,
      },
      ...brandFooter(true),
      {
        type: "text", x: 560, y: 486, w: 352, h: 30, text: "Join at codekiwi.app",
        font: FONTS.body, weight: 600, size: 12, color: "#cfe3a8", align: "END", valign: "MIDDLE",
      },
    ],
    notes:
      `CodeKiwi starter deck (${label}).\n\n` +
      `To run it: open Extensions → CodeKiwi in this deck, choose ${label} under Session Language, and click Start Lesson. ` +
      "Students join at codekiwi.app with the code shown.\n\n" +
      "Every exercise slide already has auto-graded tests (see each slide's speaker notes). " +
      "Edit the tests in the sidebar's Auto-grade Tests section, or add your own slides.",
  };
}

const hasInputOf = (t: { input: string }) => t.input !== "";

// Monospace glyphs are ~0.6em wide; pick the largest size (<= maxPt) at which
// the longest line fits the box without wrapping. pt -> px is 4/3.
const PAD = 9.6 * 2; // Slides' default text inset, both sides
function monoFit(text: string, boxW: number, maxPt: number): number {
  const longest = Math.max(...text.split("\n").map((l) => l.length), 1);
  return Math.min(maxPt, Math.floor(((boxW - PAD) / (longest * 0.6 * (4 / 3))) * 2) / 2);
}
const linePx = (pt: number, spacing: number) => pt * (4 / 3) * 1.2 * (spacing / 100);

function exerciseSlide(language: StarterLanguage, ex: Exercise, n: number): SlideSpec {
  const label = LANGUAGE_LABEL[language];
  const sample = ex.example ?? ex.tests[0];
  const hint = hintFor(language, ex);
  const outputLines = sample.output.split("\n");
  // Long outputs (FizzBuzz) show the first lines only on the slide.
  // How many output lines fit under "it prints" (see the card layout below).
  const outTop = 226 + 46 + (hasInputOf(sample) ? 68 : 0) + 22;
  const maxLines = Math.max(1, Math.floor((226 + 240 - 6 - outTop - PAD) / linePx(15, 100)));
  const shownOutput = outputLines.length > maxLines ? [...outputLines.slice(0, maxLines - 1), "…"].join("\n") : sample.output;
  const hasInput = sample.input !== "";

  const els: El[] = [
    // Left brand stripe
    { type: "rect", x: 0, y: 0, w: 12, h: 540, fill: COLORS.green },
    // Exercise pill + language pill
    { type: "round", x: 48, y: 36, w: 168, h: 30, fill: COLORS.mint },
    {
      type: "text", x: 48, y: 36, w: 168, h: 30, text: `EXERCISE ${n} OF ${EXERCISES.length}`,
      font: FONTS.heading, weight: 700, size: 10, color: COLORS.green, align: "CENTER", valign: "MIDDLE",
    },
    { type: "round", x: 224, y: 36, w: 100, h: 30, fill: COLORS.green },
    {
      type: "text", x: 224, y: 36, w: 100, h: 30, text: label.toUpperCase(),
      font: FONTS.heading, weight: 700, size: 10, color: COLORS.white, align: "CENTER", valign: "MIDDLE",
    },
    // Title + prompt
    {
      type: "text", x: 48, y: 76, w: 864, h: 58, text: ex.title,
      font: FONTS.heading, weight: 700, size: 32, color: COLORS.ink, valign: "MIDDLE",
    },
    {
      type: "text", x: 48, y: 134, w: 864, h: 80, text: ex.prompt,
      font: FONTS.body, size: 17, color: COLORS.body, lineSpacing: 120,
    },
  ];

  // Example run card (terminal look)
  const CARD_Y = 226, CARD_H = 240, CARD_B = CARD_Y + CARD_H;
  els.push(
    { type: "round", x: 48, y: CARD_Y, w: 452, h: CARD_H, fill: COLORS.code },
    { type: "ellipse", x: 68, y: CARD_Y + 20, w: 10, h: 10, fill: "#ff5f57" },
    { type: "ellipse", x: 84, y: CARD_Y + 20, w: 10, h: 10, fill: "#febc2e" },
    { type: "ellipse", x: 100, y: CARD_Y + 20, w: 10, h: 10, fill: "#28c840" },
    {
      type: "text", x: 118, y: CARD_Y + 10, w: 360, h: 30, text: "EXAMPLE RUN",
      font: FONTS.heading, weight: 700, size: 9, color: COLORS.codeMuted, valign: "MIDDLE",
    },
  );
  const runLabel = (y: number, text: string, color: string): El => ({
    type: "text", x: 64, y, w: 420, h: 26, text, font: FONTS.body, weight: 500, size: 10, color, valign: "MIDDLE",
  });
  let y = CARD_Y + 46;
  if (hasInput) {
    els.push(
      runLabel(y, "you type", COLORS.codeMuted),
      { type: "text", x: 64, y: y + 22, w: 420, h: 36, text: sample.input, font: FONTS.mono, weight: 500, size: monoFit(sample.input, 420, 18), color: COLORS.limeBright, valign: "MIDDLE" },
    );
    y += 68;
  }
  els.push(
    runLabel(y, "it prints", COLORS.codeMuted),
    {
      type: "text", x: 64, y: y + 22, w: 420, h: CARD_B - (y + 22) - 6, text: shownOutput,
      font: FONTS.mono, size: shownOutput.includes("\n") ? Math.min(15, monoFit(shownOutput, 420, 15)) : monoFit(shownOutput, 420, 18),
      color: COLORS.codeText, lineSpacing: 100,
    },
  );

  // Tip card: how to read the input, and how to print
  const TIP_X = 520, TIP_W = 392;
  const tipLabel = (y: number, text: string): El => ({
    type: "text", x: TIP_X + 20, y, w: TIP_W - 40, h: 26, text, font: FONTS.body, weight: 600, size: 10, color: COLORS.muted, valign: "MIDDLE",
  });
  const tipCode = (y: number, text: string): { el: El; h: number } => {
    const size = monoFit(text, TIP_W - 40, 15);
    const h = Math.ceil(text.split("\n").length * linePx(size, 120) + PAD);
    return {
      el: { type: "text", x: TIP_X + 20, y, w: TIP_W - 40, h, text, font: FONTS.mono, weight: 500, size, color: COLORS.ink, lineSpacing: 120 },
      h,
    };
  };
  els.push(
    { type: "round", x: TIP_X, y: CARD_Y, w: TIP_W, h: CARD_H, fill: COLORS.mint },
    {
      type: "text", x: TIP_X + 20, y: CARD_Y + 10, w: TIP_W - 40, h: 30, text: `${label.toUpperCase()} TIP`,
      font: FONTS.heading, weight: 700, size: 9, color: COLORS.green, valign: "MIDDLE",
    },
  );
  let ty = CARD_Y + 44;
  if (hint.read) {
    const c = tipCode(ty + 22, hint.read);
    els.push(tipLabel(ty, "read the input"), c.el);
    ty += 22 + c.h + 6;
  }
  const pc = tipCode(ty + 22, hint.print);
  els.push(tipLabel(ty, hint.read ? "print the answer" : "print a line"), pc.el);
  els.push(
    ...brandFooter(false),
    {
      type: "text", x: 420, y: 486, w: 492, h: 30,
      text: `${ex.tests.length} test${ex.tests.length === 1 ? "" : "s"} check your answer when you click Run`,
      font: FONTS.body, weight: 500, size: 11, color: COLORS.muted, align: "END", valign: "MIDDLE",
    },
  );
  return { bg: COLORS.cream, elements: els, notes: notesFor(ex) };
}

function endSlide(language: StarterLanguage): SlideSpec {
  return {
    bg: COLORS.forest,
    elements: [
      { type: "ellipse", x: -160, y: 260, w: 460, h: 460, fill: COLORS.forestSoft },
      ...mascot(400, 96, 160, COLORS.lime),
      {
        type: "text", x: 80, y: 290, w: 800, h: 70, text: "Nice work!",
        font: FONTS.heading, weight: 700, size: 40, color: COLORS.white, align: "CENTER", valign: "MIDDLE",
      },
      {
        type: "text", x: 80, y: 360, w: 800, h: 40,
        text: `You finished the ${LANGUAGE_LABEL[language]} warm-ups.`,
        font: FONTS.body, size: 16, color: "#cfe3a8", align: "CENTER", valign: "MIDDLE",
      },
      ...brandFooter(true),
    ],
    notes: "End of the CodeKiwi starter deck. Add your own slides after this one, or end the session from the teacher view.",
  };
}

export function buildStarterDeck(language: StarterLanguage): SlideSpec[] {
  return [titleSlide(language), ...EXERCISES.map((ex, i) => exerciseSlide(language, ex, i + 1)), endSlide(language)];
}

// ── Google Slides renderer ────────────────────────────────────────────────────

const EMU_PER_PX = 9525; // 914400 EMU per inch / 96 px per inch
const emu = (px: number) => Math.round(px * EMU_PER_PX);

function rgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return { red: ((n >> 16) & 255) / 255, green: ((n >> 8) & 255) / 255, blue: (n & 255) / 255 };
}

function placement(slideId: string, x: number, y: number, w: number, h: number) {
  return {
    pageObjectId: slideId,
    size: { width: { magnitude: emu(w), unit: "EMU" }, height: { magnitude: emu(h), unit: "EMU" } },
    transform: { scaleX: 1, scaleY: 1, translateX: emu(x), translateY: emu(y), unit: "EMU" },
  };
}

/** Requests that draw one slide's elements onto an existing (blank) slide. */
export function slideRequests(slideId: string, spec: SlideSpec): object[] {
  const reqs: object[] = [
    {
      updatePageProperties: {
        objectId: slideId,
        pageProperties: { pageBackgroundFill: { solidFill: { color: { rgbColor: rgb(spec.bg) } } } },
        fields: "pageBackgroundFill",
      },
    },
  ];
  spec.elements.forEach((el, i) => {
    const id = `${slideId}_e${i}`;
    if (el.type === "image") {
      reqs.push({ createImage: { objectId: id, url: el.url, elementProperties: placement(slideId, el.x, el.y, el.w, el.h) } });
      return;
    }
    const shapeType = el.type === "text" ? "TEXT_BOX" : el.type === "round" ? "ROUND_RECTANGLE" : el.type === "ellipse" ? "ELLIPSE" : "RECTANGLE";
    reqs.push({ createShape: { objectId: id, shapeType, elementProperties: placement(slideId, el.x, el.y, el.w, el.h) } });
    if (el.type !== "text") {
      reqs.push({
        updateShapeProperties: {
          objectId: id,
          shapeProperties: {
            shapeBackgroundFill: { solidFill: { color: { rgbColor: rgb(el.fill) } } },
            outline: { propertyState: "NOT_RENDERED" },
          },
          fields: "shapeBackgroundFill,outline",
        },
      });
      return;
    }
    reqs.push(
      { insertText: { objectId: id, text: el.text, insertionIndex: 0 } },
      {
        updateTextStyle: {
          objectId: id,
          textRange: { type: "ALL" },
          style: {
            foregroundColor: { opaqueColor: { rgbColor: rgb(el.color) } },
            weightedFontFamily: { fontFamily: el.font, weight: el.weight ?? 400 },
            fontSize: { magnitude: el.size, unit: "PT" },
          },
          fields: "foregroundColor,weightedFontFamily,fontSize",
        },
      },
      {
        updateParagraphStyle: {
          objectId: id,
          textRange: { type: "ALL" },
          style: { alignment: el.align ?? "START", lineSpacing: el.lineSpacing ?? 100, spaceAbove: { magnitude: 0, unit: "PT" }, spaceBelow: { magnitude: 0, unit: "PT" } },
          fields: "alignment,lineSpacing,spaceAbove,spaceBelow",
        },
      },
      {
        updateShapeProperties: {
          objectId: id,
          shapeProperties: { contentAlignment: el.valign ?? "TOP", autofit: { autofitType: "NONE" } },
          fields: "contentAlignment,autofit.autofitType",
        },
      },
    );
  });
  return reqs;
}

// ── HTML renderer (local preview only) ────────────────────────────────────────

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** One slide as an absolutely positioned 960x540 HTML block. Text boxes get
 *  Slides' default 0.1in inset so wrapping matches. */
export function slideHtml(spec: SlideSpec): string {
  const parts = spec.elements.map((el) => {
    const box = `left:${el.x}px;top:${el.y}px;width:${el.w}px;height:${el.h}px;`;
    if (el.type === "image") return `<img src="${el.url}" style="position:absolute;${box}object-fit:contain">`;
    if (el.type !== "text") {
      const radius = el.type === "ellipse" ? "50%" : el.type === "round" ? `${Math.min(el.w, el.h) * 0.16}px` : "0";
      return `<div style="position:absolute;${box}background:${el.fill};border-radius:${radius}"></div>`;
    }
    const jc = el.valign === "MIDDLE" ? "center" : el.valign === "BOTTOM" ? "flex-end" : "flex-start";
    const ta = el.align === "CENTER" ? "center" : el.align === "END" ? "right" : "left";
    return `<div style="position:absolute;${box}box-sizing:border-box;padding:9.6px;display:flex;flex-direction:column;justify-content:${jc};overflow:hidden">` +
      `<div style="font-family:'${el.font}';font-weight:${el.weight ?? 400};font-size:${el.size}pt;color:${el.color};text-align:${ta};line-height:${(el.lineSpacing ?? 100) * 1.2}%;white-space:pre-wrap">${esc(el.text)}</div></div>`;
  });
  return `<div class="slide" style="position:relative;width:960px;height:540px;overflow:hidden;background:${spec.bg}">${parts.join("")}</div>`;
}
