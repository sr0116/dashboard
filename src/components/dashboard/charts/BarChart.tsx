"use client";

import { useAppSelector } from "@/store/hooks";
import { BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {useFilteredSales} from "@/lib/hooks/useFilteredSales";

export default function BarChart({ full = false }: { full?: boolean }) {
    const sales = useFilteredSales();

    // 월별 판매량 합산
    const monthData = sales.reduce((acc: any, cur: any) => {
        const key = cur.monthName;
        acc[key] = (acc[key] || 0) + cur.salesAmount;
        return acc;
    }, {});

    const chartData = Object.entries(monthData).map(([month, value]) => ({
        name: month,
        value,
    }));

    return (
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-700">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                월별 판매량
            </h2>

            <div className="w-full h-64">
                <ResponsiveContainer>
                    <ReBarChart data={chartData}>
                        <XAxis dataKey="name" stroke="#aaa" tick={{ fill: "#ccc" }} />
                        <YAxis stroke="#aaa" tick={{ fill: "#ccc" }} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#6366f1" radius={4} />
                    </ReBarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
