"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiBell, FiSearch, FiMoon, FiSun } from "react-icons/fi";

export default function DashboardHeader() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <header
            className="
                flex items-center justify-between
                px-6 py-4
                bg-white dark:bg-[#1E1E1E]
                border-b border-gray-200 dark:border-[#333]
                sticky top-0 z-20 transition-colors
            "
        >
            {/* Search */}
            <div className="w-full max-w-md relative">
                <FiSearch className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />

                <input
                    type="text"
                    placeholder="Search..."
                    className="
                        w-full pl-10 pr-4 py-2 rounded-lg
                        bg-gray-100 dark:bg-[#2A2A2A]
                        text-gray-700 dark:text-gray-100
                        placeholder-gray-400 dark:placeholder-gray-500
                        outline-none transition-colors
                    "
                />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                <FiBell className="text-xl cursor-pointer hover:text-indigo-500 transition" />

                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="text-xl hover:text-indigo-500 transition"
                >
                    {theme === "dark" ? <FiSun /> : <FiMoon />}
                </button>

                <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-[#444]" />
            </div>
        </header>
    );
}
