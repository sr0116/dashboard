"use client";

import { Treemap, ResponsiveContainer } from "recharts";
import { useFilteredSales } from "@/lib/hooks/useFilteredSales";
import { getGradientColor } from "@/lib/utils/getGradientColor";

export default function TreemapChart() {
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
                        stroke="#ffffffaa"
                        content={({ x, y, width, height, index, name }: any) => {
                            const { fill } = getGradientColor(index);

                            return (
                                <g>
                                    <rect
                                        x={x}
                                        y={y}
                                        width={width}
                                        height={height}
                                        fill={fill}
                                        rx={6}
                                        stroke="#ffffffcc"
                                    />

                                    {/* 작은 박스는 텍스트 표시 X */}
                                    {width > 70 && height > 26 && (
                                        <text
                                            x={x + 10}
                                            y={y + 20}
                                            fill="white"
                                            fontSize={13}
                                            fontWeight={500}
                                            stroke="rgba(0,0,0,0.25)"
                                            strokeWidth={0.8}
                                            style={{ userSelect: "none" }}
                                        >
                                            {name}
                                        </text>
                                    )}
                                </g>
                            );
                        }}
                    />
                </ResponsiveContainer>
            </div>
        </div>
    );
}
