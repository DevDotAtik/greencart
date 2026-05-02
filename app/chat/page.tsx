import { ChatAssistant } from "@/components/chat/chat-assistant";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SectionHeading } from "@/components/shared/section-heading";

export const metadata = {
  title: "Chat Assistant",
};

export default function ChatPage() {
  return (
    <>
      <Navbar />
      <main className="shell py-10">
        <SectionHeading
          eyebrow="Smart assistant"
          title="Website chatbot powered by database + OpenAI"
          description="This assistant can answer product, price, order, account, and support questions using real website data and OpenAI fallback for general questions."
        />

        <div className="mt-8">
          <ChatAssistant />
        </div>
      </main>
      <Footer />
    </>
  );
}
