import { colorTokens, darkColorTokens } from "../data/designContent";

export function buildTokensCss() {
  const light = colorTokens
    .map((t) => `  /* ${t.name}: ${t.usage} */\n  --token-${slug(t.name)}: ${t.hex};`)
    .join("\n");
  const dark = darkColorTokens
    .map((t) => `  --token-${slug(t.name)}: ${t.hex};`)
    .join("\n");

  return `/* Generated from System Design Portal — designContent.ts */
:root {
  --color-primary: #006bdf;
  --color-primary-hover: #0056b3;
  --color-primary-muted: #e6f2ff;
  --color-primary-subtle: #004a99;
  --color-primary-border: #b3d9f7;
  --color-surface: #fafafa;
  --color-surface-elevated: #ffffff;
  --color-border: #e4e4e7;
  --color-text: #18181b;
  --color-text-muted: #71717a;
${light}
}

@media (prefers-color-scheme: dark) {
  :root {
${dark}
  }
}

.dark {
${dark}
}
`;
}

export function buildTailwindThemeJson() {
  return JSON.stringify(
    {
      $schema: "https://tailwindcss.com/schema.json",
      theme: {
        extend: {
          colors: {
            primary: {
              DEFAULT: "#006BDF",
              hover: "#0056B3",
              muted: "#E6F2FF",
              subtle: "#004A99",
              border: "#B3D9F7",
            },
            surface: { DEFAULT: "#FAFAFA", elevated: "#FFFFFF" },
            border: { DEFAULT: "#E4E4E7" },
          },
          fontFamily: {
            sans: ['"DM Sans"', "system-ui", "sans-serif"],
            mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
          },
        },
      },
    },
    null,
    2,
  );
}

function slug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function downloadTextFile(filename: string, content: string, mime = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
