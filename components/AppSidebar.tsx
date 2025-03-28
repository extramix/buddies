'use client';
import { Home, LogOut, Settings } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: Settings,
  },
];

export function AppSidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      router.push('/');
    } else {
      console.error('Logout failed');
    }
  };

  return (
    <Sidebar collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Buddies</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut />
                  <span>Log Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
