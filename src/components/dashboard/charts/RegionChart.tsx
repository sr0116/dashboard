"use client";

import { useFilteredSales } from "@/lib/hooks/useFilteredSales";
import {
    BarChart as ReBarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useAppDispatch } from "@/store/hooks";
import { openModal } from "@/store/uiSlice";

export default function RegionChart({ full = false }: { full?: boolean }) {
    const dispatch = useAppDispatch();
    const sales = useFilteredSales();

    const regionGroup = sales.reduce((acc: any, cur: any) => {
        const key = cur.region;
        acc[key] = (acc[key] || 0) + cur.salesAmount;
        return acc;
    }, {});

    const chartData = Object.entries(regionGroup).map(([region, value]) => ({
        region,
        value,
    }));

    const open = () => {
        if (!full) {
            dispatch(
                openModal({
                    title: "지역별 매출",
                    chartType: "region",
                })
            );
        }
    };

    return (
        <div
            onClick={open}
            className={`bg-white dark:bg-[#1a1a24] p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${
                full ? "" : "cursor-pointer"
            }`}
        >
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                지역별 매출
            </h2>

            <div className="w-full h-64">
                <ResponsiveContainer>
                    <ReBarChart data={chartData}>
                        <XAxis dataKey="region" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#4f46e5" radius={[5, 5, 0, 0]} />
                    </ReBarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
