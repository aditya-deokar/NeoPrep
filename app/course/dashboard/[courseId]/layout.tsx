import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ActiveThemeProvider } from "@/components/active-theme";

import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/course/dashboard-sidebar";
import { Header } from "@/components/header";




export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function CourseDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <>
    <SidebarProvider>
      <div className="flex w-full min-h-screen flex-col">
        

        <Header/>
        <div className="flex flex-1">
          <DashboardSidebar />
          <SidebarInset>
            <main className="flex-1 p-2 md:p-3 lg:p-4"> 
              <SidebarTrigger />
              <div className={cn("mx-auto")}>

                {children}
                
                </div>
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
    
    </>
  );
}
