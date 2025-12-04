export function formatNumber(num: number | null | undefined) {
    if (num === null || num === undefined || isNaN(Number(num))) {
        return "0";
    }
    return Number(num).toLocaleString("ko-KR");
}
