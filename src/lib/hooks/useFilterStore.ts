"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function useFilterStore() {
    const region = useSelector((state: RootState) => state.filters.region);
    const category = useSelector((state: RootState) => state.filters.category);
    const year = useSelector((state: RootState) => state.filters.year);

    return { region, category, year };
}
