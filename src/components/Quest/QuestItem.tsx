import { Quest } from "@/types/quests.interface";
import styles from './QuestItem.module.css';
import Image from "next/image";
import questsImage from 'public/assets/image/quests.png';

interface QuestItemProps {
    quest: Quest;
    isQualified: boolean;
    handleOpenModal: (quest: Quest) => void;
}

export const QuestItem = ({ quest, isQualified, handleOpenModal }: QuestItemProps) => {
    return (
        <div
            className={styles.questItem}
            onClick={() => handleOpenModal(quest)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleOpenModal(quest)
            }}
            role="button"
            tabIndex={0}
            aria-label={`Quest item: ${quest.title}. Status: ${isQualified ? 'qualified' : 'unqualified'}`}
        >
            <h2 className={`${styles.questItem__title} ${isQualified ? styles['questItem__status-qualified'] : styles['questItem__status-unqualified']}`}>
                <span className={styles.questItem__icon}><Image src={questsImage} alt='quests icon' /></span>
                {quest.title}
            </h2>
        </div>
    );
}
