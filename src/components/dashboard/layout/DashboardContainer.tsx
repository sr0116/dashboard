"use client";

export default function DashboardContainer({ children }: { children: React.ReactNode }) {
    return (
        <main
            className="
                p-6 space-y-6
                w-full max-w-screen-2xl mx-auto
                transition-colors
                dark:bg-[#111]
            "
        >
            {children}
        </main>
    );
}
