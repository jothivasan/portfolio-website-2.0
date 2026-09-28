import * as React from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/space-grotesk";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);

// Only use StrictMode in development - it causes double rendering which
// Safari's JavaScriptCore handles slower than Chromium engines
if (import.meta.env.DEV) {
  root.render(
    <React.StrictMode>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </React.StrictMode>,
  );
} else {
  root.render(
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>,
  );
}
