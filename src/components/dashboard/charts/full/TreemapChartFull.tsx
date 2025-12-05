"use client";

import { Treemap, ResponsiveContainer } from "recharts";
import ChartFilterBar from "@/components/dashboard/filters/ChartFilterBar";
import { useFilteredSales } from "@/lib/hooks/useFilteredSales";
import { buildTreemapData } from "@/lib/utils/buildTreemapData";
import { getGradientColorByValue } from "@/lib/utils/getGradientColor";

export default function TreemapChartFull({
                                             mode = "categoryName",
                                         }: {
    mode?: "categoryName" | "productCategoryName" | "productName";
}) {
    const sales = useFilteredSales();
    const data = buildTreemapData(sales, mode);

    // size 값 모두 추출
    const values = data.flatMap((d: any) => getAllSizes(d));
    const min = Math.min(...values);
    const max = Math.max(...values);

    return (
        <div className="space-y-6 w-full h-full">

            <ChartFilterBar />

            <div className="flex items-center gap-3">
                <div className="w-60 h-3 bg-gradient-to-r from-violet-500 to-pink-400 rounded"></div>
                <span className="text-sm text-gray-500">매출 낮음 → 높음</span>
            </div>

            <div className="w-full h-[600px]">
                <ResponsiveContainer>
                    <Treemap
                        data={data}
                        dataKey="size"
                        nameKey="name"
                        stroke="#ffffff55"
                        animationBegin={0}
                        animationDuration={0}
                        content={(props: any) => {
                            const { x, y, width, height, name, size } = props;
                            const fill = getGradientColorByValue(size ?? 0, min, max);

                            return (
                                <g>
                                    <rect
                                        x={x}
                                        y={y}
                                        width={width}
                                        height={height}
                                        fill={fill}
                                        rx={8}
                                        stroke="#fff"
                                    />

                                    {width > 90 && height > 35 && (
                                        <text
                                            x={x + 14}
                                            y={y + 26}
                                            fill="white"
                                            fontSize={16}
                                            fontWeight={700}
                                            stroke="rgba(0,0,0,0.15)"
                                            strokeWidth={0.5}
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

// size 모두 추출
function getAllSizes(node: any): number[] {
    let arr = [];
    if (node.size) arr.push(node.size);
    if (node.children) {
        node.children.forEach((c: any) => arr.push(...getAllSizes(c)));
    }
    return arr;
}
