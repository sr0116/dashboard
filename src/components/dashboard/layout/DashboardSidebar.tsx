"use client";

import { useState } from "react";
import { FiHome, FiBarChart2, FiGrid, FiLogOut } from "react-icons/fi";

export default function DashboardSidebar() {
    const [active, setActive] = useState("dashboard");

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: <FiHome /> },
        { id: "charts", label: "Charts", icon: <FiBarChart2 /> },
        { id: "tables", label: "Data Table", icon: <FiGrid /> },
    ];

    return (
        <aside
            className="
                hidden md:flex flex-col
                w-64 shrink-0
                bg-white dark:bg-[#1A1A1A]
                border-r border-gray-200 dark:border-[#333]
                p-6 transition-colors
            "
        >
            <h2 className="text-xl font-bold mb-8 text-gray-700 dark:text-gray-100">
                Dashboard
            </h2>

            <nav className="space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={`
                            flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left transition
                            ${
                            active === item.id
                                ? "bg-indigo-600 text-white"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2F2F2F]"
                        }
                        `}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="mt-auto border-t border-gray-200 dark:border-[#333] pt-4">
                <button className="flex items-center gap-3 px-4 py-2 w-full text-gray-500 dark:text-gray-400 hover:text-red-500 transition">
                    <FiLogOut />
                    Logout
                </button>
            </div>
        </aside>
    );
}
