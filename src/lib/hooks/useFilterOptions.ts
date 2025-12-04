"use client";

import { useAppSelector } from "@/store/hooks";

export function useFilterOptions() {
    const sales = useAppSelector((state) => state.sales.data);

    const categories = Array.from(new Set(sales.map((s) => s.categoryName)));
    const regions = Array.from(new Set(sales.map((s) => s.region)));
    const years = Array.from(new Set(sales.map((s) => s.year))).sort();

    return { categories, regions, years };
}
