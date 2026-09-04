/**
 * Standalone build of the Plans page, rendered from the real components in
 * `src/` so it cannot drift from the app. A small bar at the top switches
 * between the three membership states Figma draws.
 * Build with `npm run reference:plans`.
 */
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { PlansPage } from "@/components/marketing/PlansPage";
import type { Membership } from "@/lib/content";
import "./reference.css";

const STATES: { id: Membership; label: string; figma: string }[] = [
  { id: "guest", label: "Not registered", figma: "110:1019 / 351:8818" },
  { id: "free", label: "Free membership", figma: "119:1277 / 351:8617" },
  { id: "premium", label: "Premium user", figma: "119:1436 / 351:3782" },
];

function App() {
  const [state, setState] = useState<Membership>("guest");
  const current = STATES.find((s) => s.id === state)!;
  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
          padding: "10px 16px",
          background: "#0b0b0c",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          font: "500 13px/1.3 ui-sans-serif, system-ui, sans-serif",
          color: "#b9b2af",
        }}
      >
        <span style={{ color: "#8c8380" }}>Plans page —</span>
        {STATES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setState(s.id)}
            style={{
              cursor: "pointer",
              borderRadius: 999,
              border: "1px solid " + (s.id === state ? "#ff6464" : "rgba(255,255,255,0.18)"),
              background: s.id === state ? "rgba(245,12,34,0.18)" : "transparent",
              color: s.id === state ? "#fff" : "#b9b2af",
              padding: "5px 12px",
              font: "inherit",
            }}
          >
            {s.label}
          </button>
        ))}
        <span style={{ marginLeft: "auto", color: "#6a6260", fontFamily: "ui-monospace, monospace" }}>
          Figma {current.figma} · narrow the window below 768px for the 390 layout
        </span>
      </div>
      <PlansPage
        membership={state}
        nextBilling={state === "premium" ? "Next billing: May 23, 2027" : undefined}
      />
    </>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
