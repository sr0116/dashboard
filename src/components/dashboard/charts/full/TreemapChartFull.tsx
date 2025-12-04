// "use client";
//
// import { useState, useMemo } from "react";
// import { useFilteredSales } from "@/lib/hooks/useFilteredSales";
// import {
//     ResponsiveContainer,
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     Tooltip,
//     CartesianGrid,
// } from "recharts";
//
// export default function RegionChartFull() {
//     const sales = useFilteredSales();
//
//     // 지역 리스트
//     const regionList = useMemo(() => {
//         const set = new Set(sales.map((s) => s.region));
//         return ["전체 지역", ...Array.from(set)];
//     }, [sales]);
//
//     const [selectedRegion, setSelectedRegion] = useState("전체 지역");
//     const [selectedSigungu, setSelectedSigungu] = useState("전체 시군구");
//     const [sortOrder, setSortOrder] = useState("amount");
//
//     // 시군구 리스트
//     const sigunguList = useMemo(() => {
//         if (selectedRegion === "전체 지역") return [];
//
//         const filtered = sales.filter((s) => s.region === selectedRegion);
//         const set = new Set(filtered.map((s) => s.sigungu));
//         return ["전체 시군구", ...Array.from(set)];
//     }, [sales, selectedRegion]);
//
//     // 데이터 필터링
//     const filteredData = useMemo(() => {
//         return sales.filter((s) => {
//             return (
//                 (selectedRegion === "전체 지역" || s.region === selectedRegion) &&
//                 (selectedRegion === "전체 지역" ||
//                     selectedSigungu === "전체 시군구" ||
//                     s.sigungu === selectedSigungu)
//             );
//         });
//     }, [sales, selectedRegion, selectedSigungu]);
//
//     // 차트 데이터 생성
//     let chartData = [];
//
//     if (selectedRegion === "전체 지역") {
//         // ✔ 전체 지역 → 지역별 합계
//         const regionGrouped = sales.reduce((acc, cur) => {
//             acc[cur.region] = (acc[cur.region] || 0) + cur.salesAmount;
//             return acc;
//         }, {});
//
//         chartData = Object.entries(regionGrouped).map(([name, value]) => ({
//             name,
//             value,
//         }));
//     } else {
//         // ✔ 특정 지역 → 시군구별 합계
//         const grouped = filteredData.reduce((acc, cur) => {
//             acc[cur.sigungu] = (acc[cur.sigungu] || 0) + cur.salesAmount;
//             return acc;
//         }, {});
//
//         chartData = Object.entries(grouped).map(([name, value]) => ({
//             name,
//             value,
//         }));
//     }
//
//     // 정렬
//     if (sortOrder === "amount") {
//         chartData.sort((a, b) => b.value - a.value);
//     } else {
//         chartData.sort((a, b) => a.name.localeCompare(b.name));
//     }
//
//     return (
//         <div className="space-y-6 w-full">
//
//             {/* 옵션 */}
//             <div className="flex gap-3 items-center">
//
//                 {/* 지역 선택 */}
//                 <select
//                     value={selectedRegion}
//                     onChange={(e) => {
//                         setSelectedRegion(e.target.value);
//                         setSelectedSigungu("전체 시군구");
//                     }}
//                     className="border px-3 py-2 rounded"
//                 >
//                     {regionList.map((r) => (
//                         <option key={r} value={r}>{r}</option>
//                     ))}
//                 </select>
//
//                 {/* 시군구 선택 — 전체 지역일 때 숨김 */}
//                 {selectedRegion !== "전체 지역" && (
//                     <select
//                         value={selectedSigungu}
//                         onChange={(e) => setSelectedSigungu(e.target.value)}
//                         className="border px-3 py-2 rounded"
//                     >
//                         {sigunguList.map((sg) => (
//                             <option key={sg} value={sg}>{sg}</option>
//                         ))}
//                     </select>
//                 )}
//
//                 {/* 정렬 */}
//                 <select
//                     value={sortOrder}
//                     onChange={(e) => setSortOrder(e.target.value)}
//                     className="border px-3 py-2 rounded"
//                 >
//                     <option value="amount">매출액 순</option>
//                     <option value="name">이름 순</option>
//                 </select>
//             </div>
//
//             {/* 차트 */}
//             <div className="w-full h-[500px]">
//                 <ResponsiveContainer>
//                     <BarChart data={chartData}>
//                         <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
//                         <XAxis
//                             dataKey="name"
//                             interval={0}
//                             angle={-35}
//                             height={70}
//                             tick={{ fontSize: 11 }}
//                             tickFormatter={(v) => v.length > 6 ? v.slice(0, 6) + "…" : v}
//                         />
//                         <YAxis />
//                         <Tooltip />
//                         <Bar dataKey="value" fill="#4f46e5" />
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// }
