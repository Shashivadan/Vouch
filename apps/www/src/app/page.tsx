import { redirect } from "next/navigation";

import { Feature, Footer, Hero, Workflow } from "~/components/landing";
import { getCurrentUser } from "~/utils/get-current-user";

export default async function HomePage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="p-2 md:p-0">
      <Hero />
      <Workflow />
      <Feature />
      <Footer />
    </main>
  );
}
