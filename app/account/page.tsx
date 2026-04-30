import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AccountOverview } from "@/components/account/account-overview";

export default function AccountPage() {
  return (
    <>
      <Navbar />
      <main className="shell py-10">
        <div className="max-w-3xl">
          <span className="tag-pill">Account</span>
          <h1 className="mt-4 text-4xl font-extrabold">Profile, addresses, wishlist, and alerts</h1>
          <p className="mt-3 text-base text-ink-600">
            A single place for customer profile controls, saved addresses, and marketplace preferences.
          </p>
        </div>
        <div className="mt-8">
          <AccountOverview />
        </div>
      </main>
      <Footer />
    </>
  );
}
