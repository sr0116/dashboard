"use client";

import { useState } from "react";
import { useFilteredSales } from "@/lib/hooks/useFilteredSales";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    AreaChart,
    Area
} from "recharts";

export default function LineChartFull() {
    const sales = useFilteredSales();

    const [unit, setUnit] = useState(1000);
    const [year, setYear] = useState("전체");

    const filtered = year === "전체"
        ? sales
        : sales.filter((s) => s.year === Number(year));

    const monthSales: Record<string, number> = filtered.reduce((acc, cur) => {
        acc[cur.monthName] = (acc[cur.monthName] || 0) + cur.salesAmount;
        return acc;
    }, {});

    const monthProfit: Record<string, number> = filtered.reduce((acc, cur) => {
        acc[cur.monthName] = (acc[cur.monthName] || 0) + cur.netProfit;
        return acc;
    }, {});

    const salesChartData = Object.entries(monthSales).map(([month, value]) => ({
        month,
        value: value / unit,
    }));

    const profitChartData = Object.entries(monthProfit).map(([month, value]) => ({
        month,
        value: value / unit,
    }));

    return (
        <div className="space-y-10 w-full">

            {/* 옵션 */}
            <div className="flex items-center gap-4 mb-2">
                <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="border rounded px-3 py-2 bg-white dark:bg-neutral-800"
                >
                    <option value="전체">전체 연도</option>
                    <option value="2022">2022년</option>
                    <option value="2021">2021년</option>
                    <option value="2020">2020년</option>
                </select>

                <select
                    value={unit}
                    onChange={(e) => setUnit(Number(e.target.value))}
                    className="border rounded px-3 py-2 bg-white dark:bg-neutral-800"
                >
                    <option value={1}>원</option>
                    <option value={1000}>천원</option>
                    <option value={10000}>만원</option>
                </select>
            </div>

            {/* 1) 선 그래프 */}
            <div className="w-full h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={salesChartData}
                        margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(v) => v.toLocaleString()} />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#6366f1"
                            strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* 2) Gradient Area Chart */}
            <div className="w-full h-[320px] mt-16">  {/* ← 간격 추가 */}
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={profitChartData}
                        margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="profitColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ff7ce5" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(v) => v.toLocaleString()} />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#a855f7"
                            fillOpacity={1}
                            fill="url(#profitColor)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>


        </div>
    );
}
