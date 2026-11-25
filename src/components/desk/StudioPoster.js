import { createElement as h } from "react";
import { MonitorDisplay, monitorPosition, StudioDetails } from "./StudioDetails.js";

// Also rendered into the production home document so that the room and its
// typography can paint while React and the interactive controls are loading.
export default function StudioPoster() {
  return h("div", { className: "room-loading", role: "status", "aria-label": "Opening the studio" },
    h("div", { className: "studio-stage" },
      h(StudioDetails, { loading: true }),
      h("div", { className: "studio-placement", style: monitorPosition }, h(MonitorDisplay, { loading: true }))));
}
