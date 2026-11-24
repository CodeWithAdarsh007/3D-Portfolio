import { Component, lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "./context/ThemeContext";
import { TerminalProvider, useTerminal } from "./context/TerminalContext";
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";
import { routes } from "./lib/routes";

const Terminal = lazy(() => import("./components/terminal/Terminal"));

function RouteFallback() {
  const { pathname } = useLocation();
  if (pathname === "/") return <div className="room-loading" role="status" aria-label="Opening the studio" />;
  return (
    <div className="flex min-h-svh flex-1 items-center justify-center pt-28 pb-20" role="status" aria-label="Loading page">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-blue" />
    </div>
  );
}

function TerminalPanel() {
  const { isOpen } = useTerminal();
  const [loaded, setLoaded] = useState(false);
  if (isOpen && !loaded) setLoaded(true);
  return loaded ? <Suspense fallback={null}><Terminal /></Suspense> : null;
}

class RouteBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main id="main-content" className="shell page-top min-h-svh">
        <h1 className="mt-10 text-3xl font-bold">This page couldn’t open.</h1>
        <p className="my-4 text-muted">Check your connection and reload to try again.</p>
        <a className="sticker bg-sunshine" href={window.location.href}>Reload page</a>
      </main>
    );
  }
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <RouteBoundary key={location.pathname}>
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location}>
          {routes.map(({ path, Page }) => <Route key={path} path={path} element={<Page />} />)}
        </Routes>
      </Suspense>
    </RouteBoundary>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TerminalProvider>
        <BrowserRouter>
          <MotionConfig reducedMotion="user">
            <div className="grain flex min-h-screen flex-col">
              <Navbar />
              <AnimatedRoutes />
              <Footer />
              <TerminalPanel />
            </div>
          </MotionConfig>
        </BrowserRouter>
      </TerminalProvider>
    </ThemeProvider>
  );
}