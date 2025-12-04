"use client";

import DashboardSidebar from "@/components/dashboard/layout/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/layout/DashboardHeader";
import DashboardContainer from "@/components/dashboard/layout/DashboardContainer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen transition-colors dark:bg-[#111]">
            <DashboardSidebar />

            <div className="flex flex-col flex-1">
                <DashboardHeader />
                <DashboardContainer>{children}</DashboardContainer>
            </div>
        </div>
    );
}
