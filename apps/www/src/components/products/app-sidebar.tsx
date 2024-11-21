"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArchiveIcon,
  ArrowBigLeft,
  Book,
  Calendar,
  Code2,
  Edit,
  Heart,
  Home,
  Inbox,
  LucideDelete,
  Pin,
  TicketsPlane,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@acme/ui/sidebar";

// Menu items.
const InboxStack = [
  {
    title: "All",
    url: "/all",
    icon: Home,
  },
  {
    title: "Text",
    url: "/text",
    icon: Inbox,
  },
  {
    title: "Likes",
    url: "/likes",
    icon: Calendar,
  },
  {
    title: "Archived",
    url: "/archived",
    icon: ArchiveIcon,
  },
];

const pages = [
  {
    title: "Wall of Fame",
    url: "/wall-of-fame",
    icon: Heart,
  },
  {
    title: "Request testimonial",
    url: "/request-testimonial",
    icon: TicketsPlane,
  },
];

const spaceSettings = [
  {
    title: "Edit this space",
    url: "edit-this-space",
    icon: Edit,
  },
  {
    title: "Delete this space",
    url: "delete-this-space",
    icon: LucideDelete,
  },
];

const embeddings = [
  {
    title: "Embed",
    url: "embed",
    icon: Pin,
  },
  {
    title: "Embed-Doc",
    url: "embed-doc",
    icon: Book,
  },
];

const api = [
  {
    title: "Api",
    url: "api",
    icon: Code2,
  },
  {
    title: "Api-Doc",
    url: "embed-doc",
    icon: Book,
  },
];

export function AppSidebar({ className }: { className?: string }) {
  const path = usePathname().split("/");
  return (
    <Sidebar variant="floating" className={className}>
      <SidebarContent className="dark:bg-zinc-900/40">
        <SidebarGroup>
          <SidebarGroupLabel>Inbox</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {InboxStack.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={`/products/${path[2]}/${item.url}`}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pages.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={`/products/${path[2]}/${item.url}`}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Embeddings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {embeddings.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={`/products/${path[2]}/${item.url}`}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Api integration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {api.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={`/products/${path[2]}/${item.url}`}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
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
                    <Link href={`/products/${path[2]}/${item.url}`}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={`/dashboard`}>
                    <ArrowBigLeft className="mr-2 h-4 w-4" />
                    <span>Back To Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
