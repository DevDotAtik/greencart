"use client";

import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";
import { ChatAssistantWidget } from "@/components/chat/chat-assistant-widget";
import { LanguageProvider } from "@/context/language-context";

export function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <LanguageProvider>
        {children}
        <ChatAssistantWidget />
      </LanguageProvider>
    </SessionProvider>
  );
}
