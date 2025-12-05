// /lib/utils/getGradientColor.ts

export function getGradientColorByValue(value: number, min: number, max: number) {
    if (max === min) return "hsl(265, 75%, 70%)"; // fallback: 중간 보라

    const ratio = (value - min) / (max - min); // 0 ~ 1

    // 너무 어두워져서 검정처럼 보이지 않게 → 최소 55% 밝기로 제한
    const lightness = 85 - ratio * 30;  // 85% ~ 55%

    const hue = 265;        // 보라색 고정
    const saturation = 72;  // 과하게 튀지 않는 선

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
