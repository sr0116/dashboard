import { TEMPLATE_COLORS } from "./colorPalette";

export function getGradientColor(index: number) {
    const base = TEMPLATE_COLORS[index % TEMPLATE_COLORS.length];

    return {
        fill: base,
        highlight: base + "cc",
    };
}
