"use client";

import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";
import { LanguageProvider } from "@/context/language-context";

export function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </SessionProvider>
  );
}
