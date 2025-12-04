"use client";

import { useState } from "react";
import { useFilteredSales } from "@/lib/hooks/useFilteredSales";
import {
    ResponsiveContainer,
    LineChart as ReLineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import { useAppDispatch } from "@/store/hooks";
import { openModal } from "@/store/uiSlice";
import UnitSelector from "@/components/dashboard/controls/UnitSelector";

export default function LineChart({ full = false }: { full?: boolean }) {
    const dispatch = useAppDispatch();
    const sales = useFilteredSales();

    const [unit, setUnit] = useState(1); // 1 = 원 / 1000 = 천원 / 10000 = 만원


    const monthData: Record<string, number> = sales.reduce((acc, cur) => {
        const key = cur.monthName;
        acc[key] = (acc[key] || 0) + cur.salesAmount;
        return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(monthData).map(([month, value]) => ({
        month,
        value: value / unit,
    }));


    const open = () => {
        dispatch(
            openModal({
                title: "월별 매출 추이",
                chartType: "line",
            })
        );
    };

    const height = full ? "420px" : "260px";

    return (
        <div
            onClick={open}
            className="
                bg-white dark:bg-[#1a1a24]
                p-6 rounded-xl shadow-sm
                border border-gray-200 dark:border-gray-700
                cursor-pointer
            "
        >
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    월별 매출 추이
                </h2>

                {/* 옵션 클릭 시 모달 열림 방지 */}
                <div onClick={(e) => e.stopPropagation()}>
                    <UnitSelector unit={unit} setUnit={setUnit} />
                </div>
            </div>

            {/* 차트 */}
            <div className="w-full" style={{ height }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ReLineChart
                        data={chartData}
                        margin={{ top: 10, right: 10, bottom: 0, left: -5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 12 }}
                            interval={full ? 0 : 1}
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            tickFormatter={(v) => v.toLocaleString()}
                        />
                        <Tooltip
                            formatter={(v) =>
                                `${v.toLocaleString()} ${
                                    unit === 1000
                                        ? "천원"
                                            : "만원"
                                }`
                            }
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#6366f1"
                            strokeWidth={3}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                        />
                    </ReLineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
