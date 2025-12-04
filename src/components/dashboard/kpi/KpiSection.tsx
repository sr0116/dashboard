// src/components/dashboard/kpi/KpiSection.tsx
"use client";

import { useAppSelector } from "@/store/hooks";
import KpiCard from "./KpiCard";
import { formatNumber } from "@/lib/utils/format";

export default function KpiSection() {

    // Redux 에 저장된 실제 데이터 가져오기
    const sales = useAppSelector((state) => state.sales.data);

    // KPI 계산
    const totalSales = sales.reduce((acc, cur) => acc + (cur.salesAmount || 0), 0);
    const totalProfit = sales.reduce((acc, cur) => acc + (cur.netProfit || 0), 0);
    const totalCustomers = new Set(sales.map((item) => item.customerName)).size;
    const totalQuantity = sales.reduce((acc, cur) => acc + (cur.quantity || 0), 0);

    const items = [
        { title: "총 매출액", value: `${formatNumber(totalSales)}원` },
        { title: "총 고객수", value: `${formatNumber(totalCustomers)}명` },
        { title: "총 판매수량", value: `${formatNumber(totalQuantity)}건` },
        { title: "총 순이익", value: `${formatNumber(totalProfit)}원` },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, idx) => (
                <KpiCard key={idx} {...item} />
            ))}
        </div>
    );
}
