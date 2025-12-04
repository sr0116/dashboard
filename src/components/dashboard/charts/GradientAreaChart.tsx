"use client";

import { useAppSelector } from "@/store/hooks";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import {useFilteredSales} from "@/lib/hooks/useFilteredSales";

export default function GradientAreaChart({ full = false }: { full?: boolean }) {
    const sales = useFilteredSales();
    // 월별 이익 합계
    const profitData = sales.reduce((acc: any, cur: any) => {
        const key = cur.monthName;
        acc[key] = (acc[key] || 0) + cur.netProfit;
        return acc;
    }, {});

    const chartData = Object.entries(profitData).map(([month, value]) => ({
        month,
        value,
    }));

    return (
        <div className="bg-white dark:bg-[#1a1a24] p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                월별 이익 추이
            </h2>

            <div className="w-full h-64">
                <ResponsiveContainer>
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ff7ce5" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2} />
                            </linearGradient>
                        </defs>

                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#a855f7"
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
