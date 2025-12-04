"use client";

import LineChartFull from "@/components/dashboard/charts/full/LineChartFull";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { closeModal } from "@/store/uiSlice";
import RegionChartFull from "@/components/dashboard/charts/full/RegionChartFull";

export default function ChartModal() {
    const modal = useAppSelector((state) => state.ui.modal);
    const dispatch = useAppDispatch();

    if (!modal) return null;

    const renderChart = () => {
        switch (modal.chartType) {
            case "line":
                return <LineChartFull />;
            case "region":
                return <RegionChartFull />;
            case "treemap":
                return <RegionChartFull />;
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-[#111] p-6 rounded-xl w-[90%] h-[85%] relative shadow-2xl overflow-hidden">

                <button
                    onClick={() => dispatch(closeModal())}
                    className="absolute right-4 top-4 text-xl text-gray-500 hover:text-black dark:hover:text-white"
                >
                    ✕
                </button>

                <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    {modal.title}
                </h2>

                <div className="w-full h-[90%] overflow-auto">
                    {renderChart()}
                </div>
            </div>
        </div>
    );
}
