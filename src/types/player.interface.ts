interface Score {
    rank: number;
    score: number;
}

interface Skill {
    rank: number;
    level: number;
    xp: number;
}

export interface Skills {
    overall: Skill;
    attack: Skill;
    defence: Skill;
    strength: Skill;
    hitpoints: Skill;
    ranged: Skill;
    prayer: Skill;
    magic: Skill;
    cooking: Skill;
    woodcutting: Skill;
    fletching: Skill;
    fishing: Skill;
    firemaking: Skill;
    crafting: Skill;
    smithing: Skill;
    mining: Skill;
    herblore: Skill;
    agility: Skill;
    thieving: Skill;
    slayer: Skill;
    farming: Skill;
    runecraft: Skill;
    hunter: Skill;
    construction: Skill;
}

interface Minigames {
    bountyHunter: Score;
    bountyHunterRogue: Score;
    LMS: Score;
    pvpArena: Score;
    soulWars: Score;
    riftsClosed: Score;
}

interface BossRecord {
    [bossName: string]: Score;
}

interface Clues {
    all: Score;
    beginner: Score;
    easy: Score;
    medium: Score;
    hard: Score;
    elite: Score;
    master: Score;
}

export interface Player {
    username: string;
    skills: Skills;
    minigames: Minigames;
    bossRecords: BossRecord;
    type: string;
    clues: Clues;
}

