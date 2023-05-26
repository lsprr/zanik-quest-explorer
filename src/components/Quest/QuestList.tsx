import { useState } from "react";
import Modal from 'react-modal';
import { Quest } from "@/types/quests.interface";
import { Skills } from "@/types/player.interface";
import styles from './QuestList.module.css';
import { Loading } from "@/components/shared/Loading";
import { QuestItem } from "@/components/Quest/QuestItem";
import { QuestDetails } from "@/components/Quest/QuestDetails";

interface QuestListProps {
    skills: Skills;
    quests: Quest[];
    loading: boolean;
}

Modal.setAppElement('#__next');

export const QuestList = ({ skills, quests, loading }: QuestListProps) => {
    const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

    const handleOpenModal = (quest: Quest) => {
        setSelectedQuest(quest);
    };

    const handleCloseModal = () => {
        setSelectedQuest(null);
    };

    const { qualified, unqualified } = quests.reduce(
        (acc, quest) => {
            const isQualified = quest["required-skills"].every(skillRequirement => {
                const [levelString, skillName] = skillRequirement.split(" ");
                const requiredLevel = parseInt(levelString.replace("Level", "").trim(), 10);

                return skills[skillName as keyof Skills]?.level >= requiredLevel;
            });

            if (isQualified) {
                acc.qualified.push(quest);
            } else {
                acc.unqualified.push(quest);
            }

            return acc;
        },
        { qualified: [] as Quest[], unqualified: [] as Quest[] }
    );

    return (
        <div className={styles.quests}>
            <div className={styles.quests__header} />
            <div className={styles.quests__body}>
                {loading ? <Loading className={styles.quests__bodyLoading} color={"black"} /> :
                    [...qualified, ...unqualified].map(quest =>
                        <QuestItem key={quest.id} quest={quest} isQualified={qualified.includes(quest)} handleOpenModal={handleOpenModal} />
                    )
                }
            </div>
            <div className={styles.quests__footer} />

            {selectedQuest && (
                <Modal
                    className={styles.modal}
                    isOpen={true}
                    onRequestClose={handleCloseModal}
                    overlayClassName={styles.overlay}
                >
                    <QuestDetails quest={selectedQuest} handleCloseModal={handleCloseModal} />
                </Modal>
            )}
        </div>
    )
}