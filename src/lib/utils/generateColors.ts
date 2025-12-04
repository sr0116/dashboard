// /lib/utils/generateColors.ts
import { TEMPLATE_COLORS } from "./colorPalette";

export function generateColors(count: number) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const color = TEMPLATE_COLORS[i % TEMPLATE_COLORS.length];
        colors.push(color);
    }
    return colors;
}
