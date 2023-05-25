import { Quest } from "@/types/quests.interface";

export async function getQuests(): Promise<Quest[]> {
    const response = await fetch("https://osrs-quest-scraper.vercel.app");

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}
