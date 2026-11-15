import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { ThemeProvider } from "./context/ThemeContext";
import { TerminalProvider } from "./context/TerminalContext";
import { TransitionProvider } from "./context/TransitionContext";
import ObjectTransition from "./components/desk/ObjectTransition";
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";
import Terminal from "./components/terminal/Terminal";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectArchive = lazy(() => import("./pages/ProjectArchive"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const AILab = lazy(() => import("./pages/AILab"));
const Research = lazy(() => import("./pages/Research"));
const Skills = lazy(() => import("./pages/Skills"));
const Journey = lazy(() => import("./pages/Journey"));
const Achievements = lazy(() => import("./pages/Achievements"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function RouteFallback() {
  return (
    <div className="flex flex-1 items-center justify-center pt-28 pb-20" role="status" aria-label="Loading page">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-blue" />
    </div>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/archive" element={<ProjectArchive />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/ai-lab" element={<AILab />} />
          <Route path="/research" element={<Research />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TerminalProvider>
        <BrowserRouter>
          <TransitionProvider>
            <ScrollToTop />
            <div className="grain flex min-h-screen flex-col">
              <Navbar />
              <AnimatedRoutes />
              <Footer />
              <Terminal />
              <ObjectTransition />
            </div>
          </TransitionProvider>
        </BrowserRouter>
      </TerminalProvider>
    </ThemeProvider>
  );
}