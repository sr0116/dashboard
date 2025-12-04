
"use client";

export default function ProductTable() {
    const mock = [
        { name: "상품A", sales: "250,000원", qty: 120 },
        { name: "상품B", sales: "180,000원", qty: 80 },
        { name: "상품C", sales: "140,000원", qty: 60 },
    ];

    return (
        <div className="bg-white dark:bg-[#1a1a24] p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                인기 상품 목록
            </h2>

            <table className="w-full text-sm  text-gray-700 dark:text-gray-300">
                <thead>
                <tr className="border-b border-gray-400 dark:border-gray-700">
                    <th className="py-2 text-left border-b border-gray-400">상품명</th>
                    <th className="py-2 text-right border-b border-gray-400">매출액</th>
                    <th className="py-2 text-right border-b border-gray-400">판매수량</th>
                </tr>
                </thead>

                <tbody>
                {mock.map((item, i) => (
                    <tr
                        key={i}
                        className="text-right border-b border-gray-400 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <td className="py-2">{item.name}</td>
                        <td className="py-2 text-right">{item.sales}</td>
                        <td className="py-2 text-right">{item.qty}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
