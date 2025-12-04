"use client";

import { useAppSelector } from "@/store/hooks";
import { Treemap, ResponsiveContainer } from "recharts";
import {useFilteredSales} from "@/lib/hooks/useFilteredSales";

export default function TreemapChart({ full = false }: { full?: boolean }) {
    const sales = useFilteredSales();

    const grouped = sales.reduce((acc: any, cur: any) => {
        const key = cur.categoryName;
        acc[key] = (acc[key] || 0) + cur.salesAmount;
        return acc;
    }, {});

    const chartData = Object.entries(grouped).map(([name, size]) => ({
        name,
        size,
    }));

    return (
        <div className="bg-white dark:bg-[#1a1a24] p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                카테고리별 매출 비중
            </h2>

            <div className="w-full h-64">
                <ResponsiveContainer>
                    <Treemap
                        data={chartData}
                        dataKey="size"
                        stroke="#fff"
                        fill="#6366f1"
                    />
                </ResponsiveContainer>
            </div>
        </div>
    );
}
