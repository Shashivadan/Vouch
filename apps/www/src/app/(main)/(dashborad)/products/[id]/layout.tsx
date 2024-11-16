import { redirect } from "next/navigation";

import { SidebarProvider, SidebarTrigger } from "@acme/ui/sidebar";

import { AppSidebar } from "~/components/products/app-sidebar";
import { getCurrentUser } from "~/utils/get-current-user";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }
  return (
    <div className="max-w-screen-2xl p-2 md:p-0">
      <SidebarProvider defaultOpen className="flex">
        <main className="flex min-h-[calc(100svh-4rem)] w-full rounded-md border-[1px] bg-zinc-100/60 p-2 shadow-xl dark:bg-zinc-900/40">
          <AppSidebar className="fixed h-[calc(100svh-3rem)] md:inset-y-14 2xl:inset-x-48" />
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
