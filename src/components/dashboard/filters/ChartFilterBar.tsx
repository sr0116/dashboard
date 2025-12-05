"use client";

import CategoryFilter from "@/components/dashboard/filters/CategoryFilter";
import RegionFilter from "@/components/dashboard/filters/RegionFilter";
import YearFilter from "@/components/dashboard/filters/YearFilter";

export default function ChartFilterBar() {
    return (
        <div className="flex gap-3 mb-4 items-center">
            <CategoryFilter />
            <RegionFilter />
            <YearFilter />
        </div>
    );
}
