import { createElement as h } from "react";
import { identity } from "../../data/portfolioContent.js";
import { bounds, imageCrop, landscape, portrait } from "./sceneLayout.js";

function position(item, crop) {
  const style = {};
  for (const [orientation, layout] of Object.entries({ landscape, portrait })) {
    for (const [key, value] of Object.entries(bounds(layout[item]))) {
      style[`--${orientation}-${key}`] = value;
    }
    if (crop) {
      for (const [key, value] of Object.entries(imageCrop(layout[crop]))) {
        style[`--${orientation}${key}`] = value;
      }
    }
  }
  return style;
}

export function MonitorDisplay({ loading = false }) {
  return h("span", { className: "monitor-display", "aria-hidden": true },
    h("span", { className: "monitor-name" },
      h("b", null, identity.name + "."), h("small", null, "Software · AI & ML")),
    h("span", { className: "monitor-window" },
      h("span", { className: "monitor-window-bar" }, "~/workspace"),
      h("span", { className: "monitor-prompt" }, "> ",
        h("span", { className: "monitor-topics" },
          h("span", null, "NoteKart"), h("span", null, "Agent lab"), h("span", null, "Research")),
        h("span", { className: "monitor-caret" })),
      h("span", { className: "monitor-trace" })),
    loading ? null : h("span", { className: "monitor-power" }));
}

export function StudioBadge() {
  return h("span", { className: "studio-badge", "aria-hidden": true },
    h("span", { className: "badge-clip" }),
    h("span", { className: "badge-face" },
      h("img", { src: "/studio/mascot.webp", alt: "", width: 48, height: 48 }),
      h("b", null, identity.name), h("span", { className: "badge-stripe" })));
}

export function StudioDetails({ loading = false }) {
  return h("div", { className: "studio-details", "aria-hidden": true },
    h("span", { className: "studio-placement badge-wall", style: position("badgeWall", "badgeSample") }),
    loading ? h("span", { className: "studio-placement", style: position("idcard") }, h(StudioBadge)) : null,
    h("span", { className: "studio-placement desk-chai", style: position("chai") },
      h("img", { src: "/studio/chai.webp", alt: "", width: 320, height: 213, decoding: "async", fetchPriority: "low" }),
      h("span", { className: "chai-steam" }, h("i"), h("i"), h("i"))));
}

export const monitorPosition = position("monitor");
