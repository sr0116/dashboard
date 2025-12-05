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

    const [unit, setUnit] = useState(1000);
    const [year, setYear] = useState("전체");

    // -------------------------
    // ① 월 정렬 기준
    // -------------------------
    const monthOrder = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const sortByMonth = (arr: any[]) =>
        arr.sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));

    // -------------------------
    // ② year 필터
    // -------------------------
    const filteredSales =
        year === "전체" ? sales : sales.filter((s) => s.year === Number(year));

    // -------------------------
    // ③ 연도별 멀티라인 데이터 생성
    // -------------------------
    const yearlyMap: Record<string, Record<number, number>> = {};

    filteredSales.forEach((item) => {
        const { monthName, year, salesAmount } = item;

        if (!yearlyMap[monthName]) yearlyMap[monthName] = {};
        yearlyMap[monthName][year] =
            (yearlyMap[monthName][year] || 0) + salesAmount;
    });

    const multiLineData = sortByMonth(
        Object.entries(yearlyMap).map(([month, vals]) => ({
            month,
            ...Object.fromEntries(
                Object.entries(vals).map(([y, v]) => [y, v / unit])
            ),
        }))
    );

    // -------------------------
    // ④ 단일 연도 데이터
    // -------------------------
    const singleMap = filteredSales.reduce((acc, cur) => {
        if (!acc[cur.monthName]) acc[cur.monthName] = 0;
        acc[cur.monthName] += cur.salesAmount;
        return acc;
    }, {} as Record<string, number>);

    const singleData = sortByMonth(
        Object.entries(singleMap).map(([month, value]) => ({
            month,
            value: value / unit,
        }))
    );

    const data = year === "전체" ? multiLineData : singleData;

    const colors = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

    // -------------------------
    // ⑤ 모달 열기
    // -------------------------
    const open = () =>
        dispatch(openModal({ title: "월별 매출 추이", chartType: "line" }));

    // -------------------------
    // ⑥ 차트 높이 설정
    // -------------------------
    const height = full ? "480px" : "340px"; // 둘 다 크게 조정됨

    return (
        <div
            onClick={open}
            className="
                bg-white dark:bg-[#1a1a24]
                p-6 rounded-xl shadow-sm
                border border-gray-200 dark:border-gray-700
                cursor-pointer
                min-h-[420px]   /* compact & full 공통 카드 높이 증가 */
            "
        >
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    월별 매출 추이
                </h2>

                {/* 옵션 */}
                <div
                    className="flex items-center gap-3"
                    onClick={(e) => e.stopPropagation()}
                >
                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="px-2 py-1 rounded border bg-white dark:bg-neutral-800 dark:border-gray-700 text-sm"
                    >
                        <option value="전체">전체 연도</option>
                        <option value="2022">2022년</option>
                        <option value="2021">2021년</option>
                        <option value="2020">2020년</option>
                    </select>

                    <UnitSelector unit={unit} setUnit={setUnit} />
                </div>
            </div>

            {/* 차트 */}
            <div className="w-full" style={{ height }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ReLineChart
                        data={data}
                        margin={{
                            top: 10,     // 자연스럽게 올라오되 위에 붙지 않음
                            right: 20,
                            bottom: 20,
                            left: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.25} />

                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 12 }}
                            interval={full ? 0 : 1}
                        />

                        <YAxis
                            domain={["auto", "dataMax + 1500"]}  // 라인이 위/아래 공간 균형
                            tick={{ fontSize: 12 }}
                            tickFormatter={(v) => v.toLocaleString()}
                        />

                        <Tooltip />

                        {/* 전체 연도 → 멀티라인 */}
                        {year === "전체"
                            ? Object.keys(multiLineData[0] || {})
                                .filter((k) => k !== "month")
                                .map((y, idx) => (
                                    <Line
                                        key={y}
                                        type="monotone"
                                        dataKey={y}
                                        stroke={colors[idx % colors.length]}
                                        strokeWidth={2}
                                        dot={{ r: 2 }}
                                    />
                                ))
                            : (
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    dot={{ r: 3 }}
                                />
                            )}
                    </ReLineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
