
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("AI Superman Plan: Initializing application...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("AI Superman Plan: Rendered successfully.");
} catch (error) {
  console.error("AI Superman Plan: Failed to render app", error);
}
