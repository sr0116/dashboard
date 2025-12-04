"use client";

type Props = {
    unit: number;
    setUnit: (v: number) => void;
};

export default function UnitSelector({ unit, setUnit }: Props) {
    return (
        <select
            value={unit}
            onChange={(e) => setUnit(Number(e.target.value))}
            className="text-sm px-2 py-1 rounded border bg-white dark:bg-[#222]
                         dark:border-gray-700 text-gray-700 dark:text-gray-200"
        >
            <option value={1}>원</option>
            <option value={1000}>천원</option>
            <option value={10000}>만원</option>
            <option value={100000000}>억원</option>
        </select>
    );
}
