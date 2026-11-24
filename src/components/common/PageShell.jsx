import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import PageTransition from "./PageTransition";
import Icon from "./Icon";

export default function PageShell({ title, body, children }) {
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const chapter = pathname.toLowerCase().split("/").filter(Boolean).at(-1);
  return (
    <PageTransition className="page-top studio-page pb-20">
      <div className="shell">
        <header className="chapter-cover">
          <div className="chapter-copy">
            <Link to="/" className="chapter-back"><Icon name="ArrowLeft" size={15} />Back to the desk</Link>
            <h1>{title}</h1>
            {body && <p className="chapter-summary">{body}</p>}
          </div>
          <img className="chapter-photo" src={`/studio/chapters/${chapter}-${theme === "dark" ? "night" : "day"}.webp`}
            width="508" height="336" alt="" fetchPriority="high" />
        </header>
        {children}
      </div>
    </PageTransition>
  );
}
