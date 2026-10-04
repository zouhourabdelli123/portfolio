import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

let photoPromise: Promise<string> | null = null;

function getPhoto() {
  photoPromise ??= readFile(join(process.cwd(), "public/images/profile.jpg")).then(
    (buffer) => `data:image/jpeg;base64,${buffer.toString("base64")}`,
  );
  return photoPromise;
}

type Options = {
  eyebrow: string;
  title: string;
  subtitle: string;
  chips: string[];
};

/**
 * Shared Open Graph card. Satori has no Arabic shaping, so callers pass
 * Latin-script copy (the Arabic locale reuses the English strings).
 */
export async function renderOgImage({ eyebrow, title, subtitle, chips }: Options) {
  const photo = await getPhoto();
  const long = title.length > 34;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(135deg, #0a1628 0%, #0c1d38 55%, #0a1628 100%)",
          color: "#e8eef7",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -260,
            left: -160,
            width: 760,
            height: 760,
            display: "flex",
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(34,211,238,0.22), transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -300,
            right: -200,
            width: 820,
            height: 820,
            display: "flex",
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(59,130,246,0.25), transparent 65%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 0 64px 80px", width: 760 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#0f2547",
                border: "1.5px solid rgba(34,211,238,0.4)",
              }}
            >
              <svg width="42" height="42" viewBox="0 0 64 64">
                <g fill="none" stroke="#22d3ee" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 21h15L13 43h15" />
                  <path d="M34 43l8-22 8 22M37.2 35h9.6" />
                </g>
              </svg>
            </div>
            <div style={{ display: "flex", fontSize: 24, color: "#22d3ee", letterSpacing: 0.5 }}>{eyebrow}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: long ? 56 : 84,
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: -2,
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 24,
                fontSize: 32,
                backgroundImage: "linear-gradient(90deg, #22d3ee, #3b82f6)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {subtitle}
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {chips.map((chip) => (
              <div
                key={chip}
                style={{
                  display: "flex",
                  padding: "8px 18px",
                  borderRadius: 9999,
                  border: "1px solid rgba(148,163,184,0.28)",
                  background: "rgba(15,31,56,0.7)",
                  fontSize: 22,
                  color: "#a3b3ca",
                }}
              >
                {chip}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, paddingRight: 72 }}>
          <div
            style={{
              display: "flex",
              width: 340,
              height: 340,
              borderRadius: 9999,
              padding: 5,
              background: "linear-gradient(135deg, #22d3ee, #3b82f6 60%, rgba(59,130,246,0.2))",
              boxShadow: "0 0 120px rgba(34,211,238,0.35)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} width={330} height={330} alt="" style={{ borderRadius: 9999, objectFit: "cover" }} />
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
