// /components/dashboard/charts/ColorBar.tsx
import { COLOR_SCALE } from "@/lib/utils/colorPalette";

export default function ColorBar() {
    return (
        <div className="flex items-center gap-3 mb-3">
            <div
                className="h-2 w-44 rounded"
                style={{
                    background: `linear-gradient(to right, ${COLOR_SCALE.join(",")})`,
                }}
            />
            <span className="text-xs text-gray-500">매출 낮음 → 높음</span>
        </div>
    );
}
