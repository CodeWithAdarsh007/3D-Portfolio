import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deskObjects, links, nav } from "../../data/portfolioContent";
import { useTheme } from "../../context/ThemeContext";
import { useTerminal } from "../../context/TerminalContext";
import { preloadDestination } from "../../lib/routes";
import useMediaQuery from "../../hooks/useMediaQuery";
import Icon from "../common/Icon";
import { bounds, landscape, portrait } from "./sceneLayout";
import LaptopScreen from "./LaptopScreen";

const destinations = {
  monitor: "Introduction", laptop: "Projects", chip: "AI & Agent Lab",
  notebook: "Research", folder: "Project archive", idcard: "About Adarsh",
  trophy: "Achievements", envelope: "Contact",
};

function StudioClock({ box }) {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    let timer;
    function tick() {
      setNow(Date.now());
      timer = setTimeout(tick, 60000 - Date.now() % 60000);
    }
    tick();
    return () => clearTimeout(timer);
  }, []);
  const ist = new Date(now + 330 * 60000);
  const minute = ist.getUTCMinutes();
  const hour = ist.getUTCHours();
  return (
    <svg className="studio-clock" style={bounds(box)} viewBox="0 0 100 100" preserveAspectRatio="none"
      role="img" aria-label={`India Standard Time, ${hour}:${String(minute).padStart(2, "0")}`}>
      <defs><radialGradient id="dial"><stop stopColor="#efdbb7" /><stop offset=".83" stopColor="#dfc296" /><stop offset="1" stopColor="#bb9569" /></radialGradient></defs>
      <circle cx="50" cy="50" r="50" fill="url(#dial)" />
      {Array.from({ length: 60 }, (_, i) => (
        <path key={i} d={i % 5 ? "M50 5v2" : "M50 5v6"} stroke="#554430" strokeWidth={i % 5 ? ".65" : "2.1"} transform={`rotate(${i * 6} 50 50)`} />
      ))}
      <text x="50" y="74" textAnchor="middle" fontSize="6" fill="#66513a" fontFamily="serif" letterSpacing="1">IST</text>
      <g stroke="#392d23" strokeLinecap="round">
        <path d="M50 52V24" strokeWidth="3.3" transform={`rotate(${(hour + minute / 60) * 30} 50 50)`} />
        <path d="M50 54V13" strokeWidth="2" transform={`rotate(${minute * 6} 50 50)`} />
      </g>
      <circle cx="50" cy="50" r="2.8" fill="#8d4927" />
    </svg>
  );
}

function StudioIndex({ dialog, replay, intro, skip }) {
  const { theme, toggle } = useTheme();
  const terminal = useTerminal();
  const close = () => dialog.current?.close();
  return (
    <dialog ref={dialog} className="studio-index" aria-labelledby="index-title"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="studio-index-sheet">
        <header className="flex items-center justify-between gap-4">
          <h2 id="index-title" className="font-display text-3xl font-bold">Studio index</h2>
          <button className="index-close" onClick={close} aria-label="Close studio index" autoFocus><Icon name="X" /></button>
        </header>
        <nav aria-label="Studio sections" className="index-links">
          {[...nav.filter(item => item.to !== "/"), { to: "/projects/archive", label: "Project archive" }].map(item => (
            <Link key={item.to} to={item.to} onClick={close}>{item.label}<Icon name="ArrowUpRight" size={14} /></Link>
          ))}
          <a href={links.resume} download onClick={close}>{links.resumePlaceholder ? "Résumé sample" : "Résumé"}<Icon name="Download" size={14} /></a>
        </nav>
        <div className="index-tools">
          <button onClick={toggle}><Icon name={theme === "dark" ? "Sun" : "Moon"} size={16} />{theme === "dark" ? "Daylight" : "Night light"}</button>
          <button onClick={() => { close(); terminal.open(); }}><Icon name="SquareTerminal" size={16} />Terminal</button>
          <button onClick={() => { close(); if (intro) skip(); else replay(); }}><Icon name={intro ? "SkipForward" : "RotateCcw"} size={16} />{intro ? "Skip intro" : "Replay intro"}</button>
        </div>
      </div>
    </dialog>
  );
}

function initialIntro() {
  try { return !sessionStorage.getItem("tdw-intro-seen"); } catch { return true; }
}

export default function DeskScene() {
  const narrow = useMediaQuery("(orientation: portrait)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { theme, toggle } = useTheme();
  const terminal = useTerminal();
  const navigate = useNavigate();
  const location = useLocation();
  const dialog = useRef(null);
  const surface = useRef(null);
  const opening = useRef(null);
  const [selection, setSelection] = useState(null);
  const [intro, setIntro] = useState(initialIntro);
  const layout = narrow ? portrait : landscape;
  const light = theme === "dark" ? "night" : "day";
  const src = `/studio/${narrow ? "portrait-" : ""}${light}.webp`;

  function finishIntro() {
    setIntro(false);
    try { sessionStorage.setItem("tdw-intro-seen", "1"); } catch { /* private browsing */ }
  }

  // Leaving during a camera move cancels its pending destination.
  useLayoutEffect(() => {
    return () => {
      opening.current?.cancel();
      opening.current = null;
    };
  }, [location.key]);

  function visit(event, item, box) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    if (opening.current) return;
    preloadDestination(item.to);
    finishIntro();
    if (reduce || !surface.current?.animate) {
      navigate(item.to);
      return;
    }
    setSelection({ key: location.key, id: item.id });
    const [x, y, w, h] = box;
    surface.current.style.transformOrigin = `${x + w / 2}% ${y + h / 2}%`;
    const move = surface.current.animate([
      { transform: "scale(1)" },
      { transform: "scale(1.18)" },
    ], { duration: 440, easing: "cubic-bezier(.22,.72,.27,1)", fill: "forwards" });
    opening.current = move;
    move.onfinish = () => {
      if (opening.current !== move) return;
      opening.current = null;
      move.cancel();
      setSelection(null);
      navigate(item.to);
    };
  }

  function hotspot(id, label, extra = {}) {
    const [x, y, w, h, outline] = layout[id];
    const style = {
      ...bounds(layout[id]), "--cut": `polygon(${outline})`,
      "--size": `${10000 / w}% ${10000 / h}%`,
      "--pos": `${100 * x / (100 - w)}% ${100 * y / (100 - h)}%`,
    };
    const content = <>
      <span className="prop-skin" aria-hidden="true" />
      {id === "laptop" && <LaptopScreen portrait={narrow} />}
      <span className="prop-dot" aria-hidden="true" />
      <span className="prop-caption" aria-hidden="true">{label}</span>
    </>;
    const shared = { className: "room-prop", style, "data-prop": id, "aria-label": label };
    return extra.to
      ? <Link key={id} {...shared} to={extra.to} onClick={e => visit(e, extra, layout[id])}>{content}</Link>
      : <button key={id} {...shared} type="button" onClick={extra.onClick}>{content}</button>;
  }

  return (
    <section className="room-hero" aria-label="Adarsh’s interactive developer studio">
      <div className="studio-stage">
        <div ref={surface} className="studio-surface" data-opening={selection?.key === location.key ? selection.id : undefined} style={{ "--scene": `url("${src}")` }}>
          <img className="studio-art" src={src} alt="" fetchPriority="high" draggable="false" />
          <StudioClock box={layout.clock} />
          {deskObjects.map(item => hotspot(item.id, destinations[item.id], item))}
          {hotspot("lamp", theme === "dark" ? "Switch to daylight" : "Switch to night light", { onClick: toggle })}
          {hotspot("keyboard", "Open terminal", { onClick: terminal.open })}
          {intro && !reduce && <div aria-hidden="true" className="studio-intro" onAnimationEnd={finishIntro} />}
        </div>
      </div>
      <button className="drawer-pull" aria-haspopup="dialog" onClick={() => dialog.current.showModal()}>
        <Icon name="Menu" size={15} />Studio index
      </button>
      <StudioIndex dialog={dialog} intro={intro && !reduce} skip={finishIntro} replay={() => setIntro(true)} />
    </section>
  );
}
