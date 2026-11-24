import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import PageTransition from "./PageTransition";
import Icon from "./Icon";
import LaptopScreen from "../desk/LaptopScreen";
import { landscape } from "../desk/sceneLayout";

// Each page opens on a detail from its own part of the workbench.
const views = {
  "/about": "316 60 430 280", "/projects": "908 249 525 344",
  "/projects/archive": "990 473 520 340", "/ai-lab": "250 300 435 284",
  "/research": "148 478 540 352", "/skills": "585 398 564 368",
  "/journey": "426 0 505 330", "/achievements": "1185 354 344 225",
  "/contact": "622 507 430 280",
};

export default function PageShell({ eyebrow, title, body, children }) {
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const detail = views[pathname.toLowerCase().replace(/\/$/, "")];
  return (
    <PageTransition className="page-top studio-page pb-20">
      <div className="shell">
        <header className="chapter-cover">
          <div className="chapter-copy">
            <Link to="/" className="chapter-back"><Icon name="ArrowLeft" size={15} />Back to the desk</Link>
            {eyebrow && <p className="chapter-label">{eyebrow}</p>}
            <h1>{title}</h1>
            {body && <p className="chapter-summary">{body}</p>}
          </div>
          <svg className="chapter-photo" aria-hidden="true" viewBox={detail} preserveAspectRatio="xMidYMid slice">
            <image href={`/studio/${theme === "dark" ? "night" : "day"}.webp`} width="1672" height="941" />
            {pathname.toLowerCase().replace(/\/$/, "") === "/projects" && (
              <svg x={landscape.laptop[0] * 16.72} y={landscape.laptop[1] * 9.41} width={landscape.laptop[2] * 16.72} height={landscape.laptop[3] * 9.41}>
                <LaptopScreen />
              </svg>
            )}
          </svg>
        </header>
        {children}
      </div>
    </PageTransition>
  );
}
