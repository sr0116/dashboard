"use client";

import { useFilterOptions } from "@/lib/hooks/useFilterOptions";
import { useAppDispatch } from "@/store/hooks";
import { setRegion } from "@/store/filterSlice";

export default function RegionFilter() {
    const { regions } = useFilterOptions();
    const dispatch = useAppDispatch();

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const v = e.target.value;
        dispatch(setRegion(v === "ALL" ? null : v));
    };

    return (
        <select
            onChange={onChange}
            className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700 text-gray-800 dark:text-gray-200"
        >
            <option value="ALL">전체 지역</option>
            {regions.map((r, i) => (
                <option key={i} value={r}>
                    {r}
                </option>
            ))}
        </select>
    );
}
