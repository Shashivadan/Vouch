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
        <AppSidebar className="h-[calc(100svh-3rem)] md:inset-y-12 2xl:inset-x-44" />
        <main className="p-3 md:p-0">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
