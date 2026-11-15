import { createContext, useCallback, useContext, useRef, useState } from "react";

const TransitionContext = createContext(null);

/**
 * Guards the cinematic desk-object → page transition so rapid clicks can
 * never queue duplicate navigations.
 */
export function TransitionProvider({ children }) {
  const [transition, setTransition] = useState(null);
  const activeRef = useRef(false);

  const begin = useCallback((id, to, rect) => {
    if (activeRef.current) return false;
    activeRef.current = true;
    setTransition({ id, to, rect, key: Date.now() });
    return true;
  }, []);

  const end = useCallback(() => {
    activeRef.current = false;
    setTransition(null);
  }, []);

  return (
    <TransitionContext.Provider value={{ transition, begin, end }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useDeskTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useDeskTransition must be used inside TransitionProvider");
  return ctx;
}