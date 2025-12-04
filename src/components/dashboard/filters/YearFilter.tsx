"use client";

import { useFilterOptions } from "@/lib/hooks/useFilterOptions";
import { useAppDispatch } from "@/store/hooks";
import { setYear } from "@/store/filterSlice";

export default function YearFilter() {
    const { years } = useFilterOptions();
    const dispatch = useAppDispatch();

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const v = e.target.value;
        dispatch(setYear(v === "ALL" ? null : Number(v)));
    };

    return (
        <select
            onChange={onChange}
            className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700 text-gray-800 dark:text-gray-200"
        >
            <option value="ALL">전체 연도</option>
            {years.map((y, i) => (
                <option key={i} value={y}>
                    {y}
                </option>
            ))}
        </select>
    );
}
