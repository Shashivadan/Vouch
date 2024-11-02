import { ArrowBigLeft, Calendar, Edit, Heart, Home, Inbox, LucideDelete, Search, TicketsPlane } from "lucide-react";



import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@acme/ui/sidebar";





// Menu items.
const Inboxstack = [
  {
    title: "All",
    url: "#",
    icon: Home,
  },
  {
    title: "Text",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Likes",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Archived",
    url: "#",
    icon: Search,
  },
];


const embeds = [
  {
    title: "Wall of Fame",
    url: "#",
    icon: Heart,
  },
  {
    title: "Request testimonial",
    url: "#",
    icon: TicketsPlane,
  },
];

const spaceSettings = [
  {
    title: "Edit this space",
    url: "#",
    icon: Edit,
  },
  {
    title: "Delete this space",
    url: "#",
    icon: LucideDelete,
  },
  {
    title: "Back to dashboard",
    url: "/dashboard",
    icon: ArrowBigLeft,
  },
];



export function AppSidebar({ className }: { className?: string }) {
  return (
    <Sidebar variant="floating" className={className}>
      <SidebarContent className="dark:bg-zinc-900/40">
        <SidebarGroup>
          <SidebarGroupLabel>Inbox</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Inboxstack.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Intgrations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {embeds.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {spaceSettings.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}