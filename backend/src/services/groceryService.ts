import { v4 as uuidv4 } from "uuid";

interface GroceryItem {
    item: string;
    qty: string;
    cat: string;
}

export function generateGroceryList(plan: any): { id: string, itemsByCategory: Record<string, GroceryItem[]> } {
    // reliable demo items mapping
    const items: GroceryItem[] = [
        { item: "Chicken breast", qty: "2 lb", cat: "Protein" },
        { item: "Greek yogurt", qty: "32 oz", cat: "Dairy" },
        { item: "Mixed berries", qty: "1 pint", cat: "Produce" },
        { item: "Leafy greens", qty: "2 bags", cat: "Produce" },
        { item: "Rice", qty: "2 cups", cat: "Pantry" },
        { item: "Salmon", qty: "1 lb", cat: "Protein" },
        { item: "Oats", qty: "1 container", cat: "Pantry" },
        { item: "Peanut butter", qty: "1 jar", cat: "Pantry" },
        { item: "Eggs", qty: "1 dozen", cat: "Dairy" },
        { item: "Bananas", qty: "1 bunch", cat: "Produce" }
    ];

    const itemsByCategory: Record<string, GroceryItem[]> = {};

    // In a real app, this would aggregate ingredients from the plan
    // For demo, we return a static curated list but structured correctly
    for (const it of items) {
        if (!itemsByCategory[it.cat]) {
            itemsByCategory[it.cat] = [];
        }
        itemsByCategory[it.cat].push(it);
    }

    return {
        id: uuidv4(),
        itemsByCategory
    };
}
