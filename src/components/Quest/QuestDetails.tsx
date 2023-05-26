import { Quest } from "@/types/quests.interface";
import styles from './QuestDetails.module.css';
import Link from "next/link";
import Image from "next/image";
import wikiOSRS from "public/assets/image/osrswiki.webp";

interface QuestDetailsProps {
    quest: Quest;
    handleCloseModal: () => void;
}

export const QuestDetails = ({ quest, handleCloseModal }: QuestDetailsProps) => {
    return (
        <div className={styles.details}>
            <h1 className={styles.details__title}>{quest.title}</h1>
            <div>
                <h2 className={styles.details__question}>Official length</h2>
                <p className={styles.details__answer}>{quest.time}</p>
            </div>
            <div>
                <h2 className={styles.details__question}>Quests required</h2>
                <p className={styles.details__answer}>
                    {quest["required-quests"].length === 0 ? 'N/A' :
                        quest["required-quests"].map((requiredQuest, index) => <span
                            key={index}>{requiredQuest}<br /></span>)
                    }
                </p>
            </div>
            <div>
                <h2 className={styles.details__question}>Skills required</h2>
                <p className={styles.details__answer}>
                    {quest["required-skills"].length === 0 ? 'N/A' :
                        quest["required-skills"].map((requiredSkill, index) => <span
                            key={index}>{requiredSkill}<br /></span>)
                    }
                </p>
            </div>
            <div>
                <h2 className={styles.details__question}>Reward</h2>
                <p className={styles.details__answer}>
                    {quest.reward.map((exp, index) => <span key={index}>{exp}<br /></span>)}
                </p>
            </div>
            <div>
                <h2 className={styles.details__question}>Quest Point</h2>
                <p className={styles.details__answer}>{quest.questPoints}</p>
            </div>
            <div>
                <h2 className={styles.details__question}>Quest Guide</h2>
                <p className={styles.details__answer}>
                    <Link href={`https://oldschool.runescape.wiki/w/${quest.title}`} target={"_blank"}
                          rel={"noopener noreferrer"} className={styles.details__link}>
                        <Image src={wikiOSRS} alt={`OSRS Wiki Quest ${quest.title} Guide`} />
                        Go to the Quest Guide
                    </Link>
                </p>
            </div>
            <button className={styles.details__close} onClick={handleCloseModal}
                    aria-label="Close quest details">Close
            </button>
        </div>
    );
}
