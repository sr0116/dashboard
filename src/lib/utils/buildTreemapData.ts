// /lib/utils/buildTreemapData.ts

export function buildTreemapData(data: any[], mode: string) {
    if (!data || data.length === 0) return [];

    const grouped: Record<string, number> = {};

    data.forEach((row) => {
        const key =
            mode === "categoryName"
                ? row.categoryName
                : mode === "productCategoryName"
                    ? `${row.categoryName}/${row.productCategoryName}`
                    : `${row.categoryName}/${row.productCategoryName}/${row.productName}`;

        grouped[key] = (grouped[key] || 0) + row.salesAmount;
    });

    function makeTree(group: Record<string, number>) {
        const result: any[] = [];

        Object.entries(group).forEach(([path, value]) => {
            const parts = path.split("/");

            let current = result;
            parts.forEach((name, idx) => {
                let node = current.find((n) => n.name === name);
                if (!node) {
                    node = { name, children: [] };
                    current.push(node);
                }
                if (idx === parts.length - 1) {
                    node.size = value;
                }
                current = node.children;
            });
        });

        return result;
    }

    return makeTree(grouped);
}
