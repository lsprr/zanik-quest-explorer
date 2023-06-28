import attackImage from 'public/assets/image/skill/attack.png'
import hitpointsImage from 'public/assets/image/skill/hitpoints.png'
import miningImage from 'public/assets/image/skill/mining.png'
import strengthImage from 'public/assets/image/skill/strength.png'
import agilityImage from 'public/assets/image/skill/agility.png'
import smithingImage from 'public/assets/image/skill/smithing.png'
import defenceImage from 'public/assets/image/skill/defence.png'
import herbloreImage from 'public/assets/image/skill/herblore.png'
import fishingImage from 'public/assets/image/skill/fishing.png'
import rangedImage from 'public/assets/image/skill/ranged.png'
import thievingImage from 'public/assets/image/skill/thieving.png'
import cookingImage from 'public/assets/image/skill/cooking.png'
import prayerImage from 'public/assets/image/skill/prayer.png'
import craftingImage from 'public/assets/image/skill/crafting.png'
import firemakingImage from 'public/assets/image/skill/firemaking.png'
import magicImage from 'public/assets/image/skill/magic.png'
import fletchingImage from 'public/assets/image/skill/fletching.png'
import woodcuttingImage from 'public/assets/image/skill/woodcutting.png'
import runecraftingImage from 'public/assets/image/skill/runecrafting.png'
import slayerImage from 'public/assets/image/skill/slayer.png'
import farmingImage from 'public/assets/image/skill/farming.png'
import constructionImage from 'public/assets/image/skill/construction.png'
import hunterImage from 'public/assets/image/skill/hunter.png'

import Image from "next/image";
import styles from './PlayerStats.module.css';

const order: string[] = [
    "attack", "hitpoints", "mining",
    "strength", "agility", "smithing",
    "defence", "herblore", "fishing",
    "ranged", "thieving", "cooking",
    "prayer", "crafting", "firemaking",
    "magic", "fletching", "woodcutting",
    "runecraft", "slayer", "farming",
    "construction", "hunter", "overall"
];

const images = {
    "attack": attackImage,
    "hitpoints": hitpointsImage,
    "mining": miningImage,
    "strength": strengthImage,
    "agility": agilityImage,
    "smithing": smithingImage,
    "defence": defenceImage,
    "herblore": herbloreImage,
    "fishing": fishingImage,
    "ranged": rangedImage,
    "thieving": thievingImage,
    "cooking": cookingImage,
    "prayer": prayerImage,
    "crafting": craftingImage,
    "firemaking": firemakingImage,
    "magic": magicImage,
    "fletching": fletchingImage,
    "woodcutting": woodcuttingImage,
    "runecraft": runecraftingImage,
    "slayer": slayerImage,
    "farming": farmingImage,
    "construction": constructionImage,
    "hunter": hunterImage,
    "overall": "",
}

interface Skill {
    level: number;
}

interface Skills {
    [skill: string]: Skill;
}

interface PlayerStatsProps {
    skills: Partial<Skills>;
}

const renderSkill = (skill: keyof typeof images, player: Skill) => {
    let levelTop = player.level === 0 ? '-' : player.level;
    let levelBottom = player.level === 0 ? '-' : player.level;

    if (skill === "overall") {
        return (
            <div key={skill} className={styles['skill']} role="presentation">
                <div className={styles['skill-total']}>
                    <div>Total Level:</div>
                    <div>{player.level}</div>
                </div>
            </div>
        )
    }

    return (
        <div key={skill} className={styles['skill']} role="presentation">
            <div className={styles['skill__icon']}>
                <Image src={images[skill]} alt={`${skill} icon`} />
            </div>
            <div className={styles['skills__container']}>
                <span className="visually-hidden">{skill}</span>
                <div className={styles['skill__level--top']}>{levelTop}</div>
                <div className={styles['skill__slant']} role="presentation"></div>
                <div className={styles['skill__level--bottom']}>{levelBottom}</div>
            </div>
        </div>
    )
}

export const PlayerStats = ({ skills }: PlayerStatsProps) => {
    let sortedSkills: Partial<Skills> = {};
    order.forEach(key => {
        sortedSkills[key as keyof Skills] = skills[key as keyof Skills] || { level: 0 };
    });

    return (
        <div className={styles['skills__container']} role="presentation">
            {Object.entries(sortedSkills).map(([skill, player]) => renderSkill(skill as keyof typeof images, player as Skill))}
        </div>
    )
}