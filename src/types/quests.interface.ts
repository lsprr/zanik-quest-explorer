export interface Quest {
    id: string;
    title: string;
    time: string;
    "required-quests": string[];
    "required-skills": string[];
    reward: string[];
    questPoints: string;
}