"use client";

import { useAppSelector } from "@/store/hooks";

export function useFilteredSales() {
    const sales = useAppSelector((state) => state.sales.data);
    const { region, category, year } = useAppSelector((state) => state.filters);

    return sales.filter((item) => {
        const regionOk = region ? item.region === region : true;
        const categoryOk = category ? item.categoryName === category : true;
        const yearOk = year ? item.year === year : true;

        return regionOk && categoryOk && yearOk;
    });
}
