"use client";

import { useFilterOptions } from "@/lib/hooks/useFilterOptions";
import { useAppDispatch } from "@/store/hooks";
import { setCategory } from "@/store/filterSlice";

export default function CategoryFilter() {
    const { categories } = useFilterOptions();
    const dispatch = useAppDispatch();

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const v = e.target.value;
        dispatch(setCategory(v === "ALL" ? null : v));
    };

    return (
        <select
            onChange={onChange}
            className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700 text-gray-800 dark:text-gray-200"
        >
            <option value="ALL">전체 카테고리</option>
            {categories.map((c, i) => (
                <option key={i} value={c}>
                    {c}
                </option>
            ))}
        </select>
    );
}
//"use client";
//
// import { useState } from "react";
//
// export default function CategoryFilter() {
//     const [depth, setDepth] =
//         useState<"categoryName" | "productCategoryName" | "productName">(
//             "categoryName"
//         );
//
//     return (
//         <div className="flex items-center gap-2">
//
//             <select
//                 value={depth}
//                 onChange={(e) =>
//                     setDepth(
//                         e.target.value as
//                             | "categoryName"
//                             | "productCategoryName"
//                             | "productName"
//                     )
//                 }
//                 className="
//                     px-3 py-2 border rounded-lg
//                     bg-white dark:bg-gray-800
//                     text-gray-800 dark:text-gray-200
//                 "
//             >
//                 <option value="categoryName">대분류</option>
//                 <option value="productCategoryName">중분류</option>
//                 <option value="productName">제품</option>
//             </select>
//         </div>
//     );
// }