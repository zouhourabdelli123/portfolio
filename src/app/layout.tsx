import type { ReactNode } from "react";
import "./globals.css";

// The real root layout lives in app/[locale]/layout.tsx (it owns <html>/<body>).
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
