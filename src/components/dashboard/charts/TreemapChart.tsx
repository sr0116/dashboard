"use client";

import { Treemap, ResponsiveContainer } from "recharts";
import { useFilteredSales } from "@/lib/hooks/useFilteredSales";
import { buildTreemapData } from "@/lib/utils/buildTreemapData";
import { getGradientColorByValue } from "@/lib/utils/getGradientColor";
import { useState } from "react";
import { openModal } from "@/store/uiSlice";
import { useAppDispatch } from "@/store/hooks";

export default function TreemapChart() {
    const dispatch = useAppDispatch();
    const [mode, setMode] = useState<"categoryName" | "productCategoryName" | "productName">("categoryName");

    const sales = useFilteredSales();
    const data = buildTreemapData(sales, mode);

    // 전체 size 값 수집
    const values = getAllSizesFromTree(data);
    const min = Math.min(...values);
    const max = Math.max(...values);

    return (
        <div className="bg-white dark:bg-[#1a1a24] p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                카테고리별 매출 비중
            </h2>

            {/* Depth 선택 */}
            <div className="flex items-center gap-3 mb-2">
                <label className="text-sm">Depth:</label>
                <select
                    value={mode}
                    onChange={(e) =>
                        setMode(e.target.value as "categoryName" | "productCategoryName" | "productName")
                    }
                    className="px-2 py-1 border rounded text-sm dark:bg-gray-800 dark:text-gray-200"
                >
                    <option value="categoryName">대분류</option>
                    <option value="productCategoryName">중분류</option>
                    <option value="productName">제품</option>
                </select>
            </div>

            {/* Colorbar */}
            <div className="flex items-center gap-3 mb-3">
                <div className="w-40 h-2 bg-gradient-to-r from-violet-500 to-pink-400 rounded"></div>
                <span className="text-xs text-gray-500">매출 낮음 → 높음</span>
            </div>

            <div className="w-full h-64">
                <ResponsiveContainer>
                    <Treemap
                        data={data}
                        dataKey="size"
                        nameKey="name"
                        stroke="#ffffff55"
                        animationBegin={0}
                        animationDuration={0}
                        isAnimationActive={false}
                        content={({ x, y, width, height, name, size }: any) => {
                            // 초기 렌더링에서 검정 박스 방지
                            if (!size || width <= 0 || height <= 0) return null;

                            const fill = getGradientColorByValue(size, min, max);

                            return (
                                <g>
                                    <rect
                                        x={x}
                                        y={y}
                                        width={width}
                                        height={height}
                                        fill={fill}
                                        rx={6}
                                        stroke="#fff"
                                        className="cursor-pointer transition hover:opacity-80"
                                        onClick={() =>
                                            dispatch(openModal({ title: name, chartType: "treemap" }))
                                        }
                                    />

                                    {width > 70 && height > 26 && (
                                        <text
                                            x={x + 10}
                                            y={y + 20}
                                            fill="white"
                                            fontSize={13}
                                            fontWeight={600}
                                            stroke="rgba(0,0,0,0.3)"
                                            strokeWidth={0.4}
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

/* ---- size 수집 공용 함수 ---- */
function getAllSizesFromTree(tree: any[]): number[] {
    const result: number[] = [];
    const walk = (node: any) => {
        if (node.size) result.push(node.size);
        if (node.children) node.children.forEach(walk);
    };
    tree.forEach(walk);
    return result;
}
