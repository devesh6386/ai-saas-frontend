import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "AgentProcure AI | Executive Procurement OS",
  description: "Autonomous enterprise procurement research, policy validation, and vendor routing.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
