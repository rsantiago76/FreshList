import { v4 as uuidv4 } from "uuid";

interface Meal {
    name: string;
    calories: number;
    protein: number;
}

interface DayPlan {
    date: string;
    meals: {
        breakfast: Meal;
        lunch: Meal;
        dinner: Meal;
        snack: Meal;
    };
    totalCalories: number;
    totalProtein: number;
}

const mealPool: Meal[] = [
    { name: "Greek yogurt + berries", calories: 320, protein: 28 },
    { name: "Oatmeal + banana + peanut butter", calories: 450, protein: 18 },
    { name: "Chicken salad bowl", calories: 520, protein: 42 },
    { name: "Turkey wrap + side salad", calories: 540, protein: 35 },
    { name: "Salmon + rice + veggies", calories: 650, protein: 45 },
    { name: "Tofu stir-fry", calories: 560, protein: 28 },
    { name: "Protein smoothie", calories: 380, protein: 32 },
    { name: "Cottage cheese + fruit", calories: 260, protein: 22 },
    { name: "Steak and potatoes", calories: 700, protein: 50 },
    { name: "Veggie burrito bowl", calories: 480, protein: 20 },
];

function pick(i: number): Meal {
    return mealPool[i % mealPool.length];
}

function makeDay(date: string, offset: number): DayPlan {
    // Simple deterministic logic based on offset for demo consistency
    const breakfast = pick(offset + 0);
    const lunch = pick(offset + 2);
    const dinner = pick(offset + 4);
    const snack = pick(offset + 6);

    return {
        date,
        meals: { breakfast, lunch, dinner, snack },
        totalCalories: breakfast.calories + lunch.calories + dinner.calories + snack.calories,
        totalProtein: breakfast.protein + lunch.protein + dinner.protein + snack.protein,
    };
}

export function generateWeek(startISO: string): DayPlan[] {
    const start = new Date(startISO + "T00:00:00Z");
    return Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(start);
        d.setUTCDate(start.getUTCDate() + i);
        const date = d.toISOString().slice(0, 10);
        return makeDay(date, i);
    });
}

export function swapMeal(dayIndex: number, mealKey: string, currentDay: DayPlan): DayPlan {
    const newDay = { ...currentDay, meals: { ...currentDay.meals } };
    // Pick a random new meal that isn't the current one (simple logic)
    const randomOffset = Math.floor(Math.random() * 10) + 1;
    const newMeal = pick(dayIndex + randomOffset);

    (newDay.meals as any)[mealKey] = newMeal;

    newDay.totalCalories = Object.values(newDay.meals).reduce((sum, m) => sum + m.calories, 0);
    newDay.totalProtein = Object.values(newDay.meals).reduce((sum, m) => sum + m.protein, 0);

    return newDay;
}
