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
    <div className="mx-auto max-w-screen-2xl">
      <SidebarProvider defaultOpen className="min-h-fit">
        <AppSidebar className="h-[calc(100svh-3rem)] md:inset-y-12 2xl:inset-x-48" />
        <main className="min-h-[calc(100svh-4rem)] w-full rounded-md p-3 shadow-xl md:p-0 dark:md:bg-zinc-900/40 lg:border-[1px]">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
