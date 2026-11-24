import { createElement as h } from "react";
import { identity } from "../../data/portfolioContent.js";
import { bounds, landscape, portrait } from "./sceneLayout.js";

export function MonitorSignature() {
  return h("span", { className: "monitor-signature", "aria-hidden": true },
    h("b", null, identity.name + "."), h("small", null, "Software · AI & ML"));
}

// Also rendered into the production home document so that the room and its
// typography can paint while React and the interactive controls are loading.
export default function StudioPoster() {
  const style = {};
  for (const [orientation, layout] of Object.entries({ landscape, portrait })) {
    for (const [key, value] of Object.entries(bounds(layout.monitor))) {
      style[`--${orientation}-${key}`] = value;
    }
  }
  return h("div", { className: "room-loading", role: "status", "aria-label": "Opening the studio" },
    h("div", { className: "studio-stage" },
      h("div", { className: "poster-monitor", style }, h(MonitorSignature))));
}
