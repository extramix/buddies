// import { AppSidebar } from '@/components/AppSidebar';
// import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

import { AppSidebar } from "@/components/AppSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false} 
      style={{ 
        "--sidebar-width": "14rem", 
        "--sidebar-width-icon": "3rem" 
      } as React.CSSProperties}>
      <AppSidebar />
      <SidebarInset>
        <div className="p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
