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
    "#7C3AED", "#8B5CF6", "#A78BFA", "#C4B5FD", "#DDD6FE",
    "#6366F1", "#818CF8", "#A5B4FC", "#C7D2FE",
    "#4F46E5", "#6D5FFC", "#8EA2FF",
];

export const COLOR_SCALE = [
    "hsl(228, 75%, 90%)",
    "hsl(255, 75%, 72%)",
    "hsl(268, 75%, 55%)",
    "hsl(280, 80%, 42%)",
];

export function getGradientColorByValue(value: number, min: number, max: number) {
    if (max === min) return COLOR_SCALE[2];
    const ratio = (value - min) / (max - min);

    if (ratio < 0.33) return COLOR_SCALE[0];
    if (ratio < 0.66) return COLOR_SCALE[1];
    if (ratio < 0.9)  return COLOR_SCALE[2];
    return COLOR_SCALE[3];
}
