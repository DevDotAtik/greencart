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
          title="Website assistant powered by product data, order data and OpenAI"
          description="The same assistant is now available as a floating popup across the site, with current page and product context passed into each chat request."
        />

        <div className="mt-8">
          <ChatAssistant />
        </div>
      </main>
      <Footer />
    </>
  );
}
