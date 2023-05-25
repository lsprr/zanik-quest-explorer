export async function getQuests() {
    try {
        const response = await fetch("https://osrs-quest-scraper.vercel.app");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch quests: ", error);
        throw error;
    }
}
