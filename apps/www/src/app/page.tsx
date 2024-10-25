import { Feature, Footer, Hero, Workflow } from "~/components/landing";

export default function HomePage() {
  return (
    <main className="p-2 md:p-0">
      <Hero />
      <Workflow />
      <Feature />
      <Footer />
    </main>
  );
}
