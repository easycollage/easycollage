import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "EasyCollege TG EAPCET College Predictor";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #ecfdf5 0%, #ffffff 48%, #dcfce7 100%)",
          color: "#111827",
          padding: 72,
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 62,
              height: 62,
              borderRadius: 18,
              background: "#16a34a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 34,
              fontWeight: 900,
            }}
          >
            E
          </div>
          <div style={{ fontSize: 34, fontWeight: 800 }}>EasyCollege</div>
        </div>

        <div>
          <div
            style={{
              display: "inline-flex",
              border: "1px solid #bbf7d0",
              background: "rgba(255,255,255,0.78)",
              borderRadius: 999,
              padding: "12px 18px",
              color: "#15803d",
              fontSize: 24,
              fontWeight: 800,
              marginBottom: 28,
            }}
          >
            TG EAPCET College Predictor
          </div>
          <div
            style={{
              fontSize: 78,
              lineHeight: 0.96,
              letterSpacing: -4,
              fontWeight: 900,
              maxWidth: 900,
            }}
          >
            Your rank. Your college.
          </div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#4b5563", maxWidth: 820 }}>
            Predict eligible colleges, compare cutoffs, and shortlist web options for Telangana admissions.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, color: "#166534", fontSize: 24, fontWeight: 700 }}>
          <span>College Prediction</span>
          <span>+</span>
          <span>Web Options</span>
          <span>+</span>
          <span>Cutoff Insights</span>
        </div>
      </div>
    ),
    size
  );
}
