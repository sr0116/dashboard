"use client";

import { ResponsiveContainer, Treemap } from "recharts";
import { useFilteredSales } from "@/lib/hooks/useFilteredSales";
import { getGradientColor } from "@/lib/utils/getGradientColor";

export default function TreemapChartFull() {
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
        <div className="space-y-6 w-full h-full">
            <div className="w-full h-[600px]">
                <ResponsiveContainer width="100%" height="100%">
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
                                        rx={10}
                                        stroke="#ffffffcc"
                                    />

                                    {width > 80 && height > 32 && (
                                        <text
                                            x={x + 12}
                                            y={y + 22}
                                            fill="white"
                                            fontWeight={500}
                                            fontSize={15}
                                            stroke="rgba(0,0,0,0.25)"
                                            strokeWidth={1}
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
