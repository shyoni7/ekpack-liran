import { ImageResponse } from "next/og";

// תמונת התצוגה המקדימה שמופיעה כששולחים את הקישור בוואטסאפ או ברשתות.
// הטקסט באנגלית בכוונה — הגופן המובנה של ImageResponse לא כולל עברית.
export const alt = "E.K.PACK — פנסיון ומעון יום לכלבים";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2f7a4d 0%, #18b7ae 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 128, fontWeight: 700, letterSpacing: -2 }}>
          E.K.PACK
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 44,
            fontWeight: 600,
            opacity: 0.95,
          }}
        >
          Dog Boarding &amp; Daycare
        </div>
        <div style={{ marginTop: 12, fontSize: 32, opacity: 0.85 }}>
          Training &amp; Behavior Rehabilitation
        </div>
        <div style={{ marginTop: 48, fontSize: 28, opacity: 0.8 }}>
          ekpack.co.il
        </div>
      </div>
    ),
    size
  );
}
