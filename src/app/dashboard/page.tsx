"use client";

import CategoryFilter from "@/components/dashboard/filters/CategoryFilter";
import RegionFilter from "@/components/dashboard/filters/RegionFilter";
import YearFilter from "@/components/dashboard/filters/YearFilter";

import KpiSection from "@/components/dashboard/kpi/KpiSection";

import TreemapChart from "@/components/dashboard/charts/TreemapChart";
import LineChart from "@/components/dashboard/charts/LineChart";
import GradientAreaChart from "@/components/dashboard/charts/GradientAreaChart";
import RegionChart from "@/components/dashboard/charts/RegionChart";
import BarChart from "@/components/dashboard/charts/BarChart";

import ProductTable from "@/components/dashboard/table/ProductTable";

import { useSalesQuery } from "@/lib/hooks/useSalesQuery";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setMode } from "@/store/uiSlice";

import ChartModal from "@/components/dashboard/modal/ChartModal";

export default function DashboardPage() {
    useSalesQuery();

    const dispatch = useAppDispatch();
    const mode = useAppSelector((state) => state.ui.mode);

    return (
        <div className="space-y-6">

            {/* 필터 섹션 */}
            <div className="flex gap-3 items-center">
                <CategoryFilter />
                <RegionFilter />
                <YearFilter />

                {/* 모드 전환 버튼 */}
                <button
                    onClick={() =>
                        dispatch(setMode(mode === "compact" ? "full" : "compact"))
                    }
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
                >
                    {mode === "compact" ? "전체 화면 보기" : "컴팩트 보기"}
                </button>
            </div>

            {/* KPI */}
            <KpiSection />

            {/* 컴팩트 모드 */}
            {mode === "compact" && (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <TreemapChart />
                        <LineChart />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ProductTable />
                        <BarChart />
                    </div>

                    <RegionChart />
                </>
            )}



            {/* 전체 시각화 모드 */}
            {mode === "full" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TreemapChart full />
                    <LineChart  />
                    <GradientAreaChart full />
                    <RegionChart full />
                </div>
            )}


            {/* 차트 모달 */}
            <ChartModal />
        </div>
    );
}
