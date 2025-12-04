// /lib/utils/colorPalette.ts

export const PALETTE = {
    indigo:   "#6366F1",
    purple:   "#A855F7",
    blue:     "#3B82F6",
    sky:      "#0EA5E9",
    cyan:     "#06B6D4",
    teal:     "#14B8A6",
    green:    "#10B981",
    amber:    "#F59E0B",
    orange:   "#F97316",
    red:      "#EF4444",
    pink:     "#EC4899",
    fuchsia:  "#D946EF",
};

export const TEMPLATE_COLORS = [
    "#7C3AED", // 진보라
    "#8B5CF6",
    "#A78BFA",
    "#C4B5FD",
    "#DDD6FE",

    "#6366F1", // 인디고
    "#818CF8",
    "#A5B4FC",
    "#C7D2FE",

    "#4F46E5", // 딥 인디고
    "#6D5FFC",
    "#8EA2FF",
];


// Treemap, Bar, Pie 등 공통 컬러 시퀀스
export const COLOR_SEQUENCE = [
    PALETTE.indigo,
    PALETTE.sky,
    PALETTE.purple,
    PALETTE.cyan,
    PALETTE.blue,
    PALETTE.teal,
    PALETTE.green,
    PALETTE.amber,
    PALETTE.orange,
    PALETTE.red,
    PALETTE.pink,
    PALETTE.fuchsia,
];



export function getColor(i: number) {
    return COLOR_SEQUENCE[i % COLOR_SEQUENCE.length];
}
