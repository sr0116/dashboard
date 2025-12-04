"use client";

import { motion } from "framer-motion";

type Props = {
    title: string;
    value: string;
};

export default function KpiCard({ title, value }: Props) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.15 }}
            className="
                bg-white dark:bg-[#1a1a24]
                p-5 rounded-xl shadow-sm border
                border-gray-200 dark:border-gray-700
                cursor-pointer select-none
            "
        >
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-gray-100">
                {value}
            </h3>
        </motion.div>
    );
}
