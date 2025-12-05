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

    // -----------------------------
    // ① 연도별 멀티라인 데이터 생성
    // -----------------------------
    const yearlyMap: Record<string, Record<number, number>> = {};
    const profitMap: Record<string, Record<number, number>> = {};

    sales.forEach((item) => {
        const month = item.monthName;
        const y = item.year;

        if (!yearlyMap[month]) yearlyMap[month] = {};
        if (!profitMap[month]) profitMap[month] = {};

        yearlyMap[month][y] =
            (yearlyMap[month][y] || 0) + item.salesAmount;

        profitMap[month][y] =
            (profitMap[month][y] || 0) + item.netProfit;
    });

    const multiSalesData = Object.entries(yearlyMap).map(([month, vals]) => ({
        month,
        ...Object.fromEntries(
            Object.entries(vals).map(([y, v]) => [y, v / unit])
        ),
    }));

    const multiProfitData = Object.entries(profitMap).map(([month, vals]) => ({
        month,
        ...Object.fromEntries(
            Object.entries(vals).map(([y, v]) => [y, v / unit])
        ),
    }));


    // ② 개별 연도 선택 시 단일 라인용 데이터
    const filtered = year === "전체"
        ? sales
        : sales.filter((s) => s.year === Number(year));

    const singleSalesData = Object.entries(
        filtered.reduce((acc, cur) => {
            acc[cur.monthName] =
                (acc[cur.monthName] || 0) + cur.salesAmount;
            return acc;
        }, {} as Record<string, number>)
    ).map(([month, value]) => ({ month, value: value / unit }));

    const singleProfitData = Object.entries(
        filtered.reduce((acc, cur) => {
            acc[cur.monthName] =
                (acc[cur.monthName] || 0) + cur.netProfit;
            return acc;
        }, {} as Record<string, number>)
    ).map(([month, value]) => ({ month, value: value / unit }));


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

            {/* 1) 판매액 선 그래프 */}
            <div className="w-full h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={year === "전체" ? multiSalesData : singleSalesData}
                        margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(v) => v.toLocaleString()} />
                        <Tooltip />

                        {year === "전체"
                            ? Object.keys(multiSalesData[0] || {})
                                .filter((k) => k !== "month")
                                .map((y, idx) => (
                                    <Line
                                        key={y}
                                        type="monotone"
                                        dataKey={y}
                                        stroke={[
                                            "#6366F1",
                                            "#10B981",
                                            "#F59E0B",
                                            "#EF4444",
                                            "#8B5CF6",
                                        ][idx % 5]}
                                        strokeWidth={2}
                                    />
                                ))
                            : (
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#6366F1"
                                    strokeWidth={3}
                                />
                            )}
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* 2) 이익 Area Chart */}
            <div className="w-full h-[320px] mt-16">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={year === "전체" ? multiProfitData : singleProfitData}
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

                        {year === "전체"
                            ? Object.keys(multiProfitData[0] || {})
                                .filter((k) => k !== "month")
                                .map((y, idx) => (
                                    <Area
                                        key={y}
                                        type="monotone"
                                        dataKey={y}
                                        stroke="#a855f7"
                                        fillOpacity={1}
                                        fill="url(#profitColor)"
                                    />
                                ))
                            : (
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#a855f7"
                                    fillOpacity={1}
                                    fill="url(#profitColor)"
                                />
                            )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
