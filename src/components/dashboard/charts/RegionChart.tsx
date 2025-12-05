"use client";

import { useState, useMemo } from "react";
import { useFilteredSales } from "@/lib/hooks/useFilteredSales";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import { useAppDispatch } from "@/store/hooks";
import { openModal } from "@/store/uiSlice";

const REGION_COLORS = [
    "#7C3AED",
    "#8B5CF6",
    "#A78BFA",
    "#C4B5FD",
    "#DDD6FE",
    "#6366F1",
    "#818CF8",
    "#A5B4FC",
    "#C7D2FE",
];

export default function RegionChart({ full = false }: { full?: boolean }) {
    const dispatch = useAppDispatch();
    const sales = useFilteredSales();

    // 지역 목록
    const regionList = useMemo(() => {
        const set = new Set(sales.map((s) => s.region));
        return ["전체 지역", ...Array.from(set)];
    }, [sales]);

    const [selectedRegion, setSelectedRegion] = useState("전체 지역");
    const [selectedSigungu, setSelectedSigungu] = useState("전체 시군구");
    const [sortOrder, setSortOrder] = useState("amount");

    // 시군구 목록 (특정 지역 선택 시만)
    const sigunguList = useMemo(() => {
        if (selectedRegion === "전체 지역") return [];
        const filtered = sales.filter((s) => s.region === selectedRegion);
        const set = new Set(filtered.map((s) => s.sigungu));
        return ["전체 시군구", ...Array.from(set)];
    }, [sales, selectedRegion]);

    // ----------------------------
    // 데이터 필터링
    // ----------------------------
    const filteredData = useMemo(() => {
        return sales.filter((s) => {
            return (
                (selectedRegion === "전체 지역" || s.region === selectedRegion) &&
                (selectedRegion === "전체 지역" ||
                    selectedSigungu === "전체 시군구" ||
                    s.sigungu === selectedSigungu)
            );
        });
    }, [sales, selectedRegion, selectedSigungu]);

    // ----------------------------
    // 차트 데이터 생성
    // ----------------------------
    let chartData = [];

    if (selectedRegion === "전체 지역") {
        // 지역별 매출 합계
        const grouped = filteredData.reduce((acc, cur) => {
            acc[cur.region] = (acc[cur.region] || 0) + cur.salesAmount;
            return acc;
        }, {});

        chartData = Object.entries(grouped).map(([name, value]) => ({
            name,
            value,
        }));
    } else {
        // 시군구별 매출 합계
        const grouped = filteredData.reduce((acc, cur) => {
            acc[cur.sigungu] = (acc[cur.sigungu] || 0) + cur.salesAmount;
            return acc;
        }, {});

        chartData = Object.entries(grouped).map(([name, value]) => ({
            name,
            value,
        }));
    }

    // 정렬
    if (sortOrder === "amount") {
        chartData.sort((a, b) => b.value - a.value);
    } else {
        chartData.sort((a, b) => a.name.localeCompare(b.name));
    }

    // 모달 오픈
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
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    지역별 매출
                </h2>

                {/* 옵션 */}
                <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-2">

                    {/* 지역 */}
                    <select
                        value={selectedRegion}
                        onChange={(e) => {
                            setSelectedRegion(e.target.value);
                            setSelectedSigungu("전체 시군구");
                        }}
                        className="border px-2 py-1 rounded"
                    >
                        {regionList.map((r) => (
                            <option key={r}>{r}</option>
                        ))}
                    </select>

                    {/* 시군구 */}
                    {selectedRegion !== "전체 지역" && (
                        <select
                            value={selectedSigungu}
                            onChange={(e) => setSelectedSigungu(e.target.value)}
                            className="border px-2 py-1 rounded"
                        >
                            {sigunguList.map((sg) => (
                                <option key={sg}>{sg}</option>
                            ))}
                        </select>
                    )}

                    {/* 정렬 */}
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="border px-2 py-1 rounded"
                    >
                        <option value="amount">매출순</option>
                        <option value="name">이름순</option>
                    </select>
                </div>
            </div>

            {/* 차트 */}
            <div className="w-full h-64">
                <ResponsiveContainer>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                        <YAxis />
                        <Tooltip />

                        <Bar
                            dataKey="value"
                            fill={REGION_COLORS[0]}  // 💜 원하는 색 하나로 고정
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
