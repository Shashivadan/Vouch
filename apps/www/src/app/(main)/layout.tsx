import { MainNav } from "~/components/nav-bar/main-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <MainNav />
      <main className="mx-auto max-w-screen-2xl">{children}</main>
    </div>
  );
}
