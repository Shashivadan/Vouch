
import { Hero } from "~/components/landing";

export const runtime = "edge";

export default function HomePage() {


  return (
    <main className="md:p-0 p-2 ">
      <Hero />
    </main>
  );
}
