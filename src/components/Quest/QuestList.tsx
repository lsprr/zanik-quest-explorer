import { useState } from "react";
import Modal from 'react-modal';
import { Quest } from "@/types/quests.interface";
import { Skills } from "@/types/player.interface";
import styles from './QuestList.module.css';
import { Loading } from "@/components/shared/Loading";
import { QuestItem } from "@/components/Quest/QuestItem";
import { QuestDetails } from "@/components/Quest/QuestDetails";

interface QuestListProps {
    skills: Partial<Skills>;
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

    const isQuestQualified = (quest: Quest, skills: Partial<Skills>): boolean => {
        // The function uses Array.prototype.every() on quest['required-skills'] array.
        // .every() checks if all elements in an array pass a test (provided as a function).
        return quest['required-skills'].every(skillRequirement => {
            // Here we use a regular expression to match the level and skill name from the skillRequirement string.
            const levelMatch = skillRequirement.match(/(\d+)\s(.+)/i);
            // If the string doesn't match our regular expression (meaning it's not a skill requirement), we return true.
            // This means for the purpose of our .every() check, this requirement is considered passed.
            if (!levelMatch) {
                return true;
            }
            // If we have a match, we parse the required level and the skill name.
            const requiredLevel = parseInt(levelMatch[1], 10);
            const skillName = levelMatch[2].toLowerCase().trim();

            // If the player does not have this skill, we return true.
            // This requirement is considered passed for the purpose of our .every() check.
            if (!(skillName in skills)) {
                return true;
            }

            // If the player does have this skill, we compare the player's level in this skill with the required level.
            // If the player's level is greater than or equal to the required level, we return true, else we return false.
            return (skills[skillName as keyof Skills]?.level || 0) >= requiredLevel;
        });
    };

    // We use Array.prototype.reduce() on the quests array.
    // .reduce() executes a reducer function on each element of the array, resulting in a single output value.
    const { qualified, unqualified } = quests.reduce(
        (acc, quest) => {
            // We determine whether the player is qualified for the current quest.
            const isQualified = isQuestQualified(quest, skills);

            // If the player is qualified, we add the quest to the 'qualified' array.
            // If not, we add it to the 'unqualified' array.
            if (isQualified) {
                acc.qualified.push(quest);
            } else {
                acc.unqualified.push(quest);
            }

            // We return our accumulator object, which keeps track of our 'qualified' and 'unqualified' arrays.
            // This will be passed as the 'acc' argument in the next call of the reducer function.
            return acc;
        },
        // The second argument to .reduce() is the initial value of our accumulator.
        // In our case, it's an object with two empty arrays 'qualified' and 'unqualified'.
        { qualified: [] as Quest[], unqualified: [] as Quest[] }
    );

    return (
        <div className={styles.quests}>
            <div className={styles.quests__header} />
            <div className={styles.quests__body}>
                <p className={styles.quests__bodyParagraph}>Click on a quest title for more information.</p>
                {loading ? <Loading className={styles.quests__bodyLoading} color={"black"} /> :
                    [...qualified, ...unqualified].map(quest =>
                        <QuestItem key={quest.id} quest={quest} isQualified={qualified.includes(quest)}
                                   handleOpenModal={handleOpenModal} />
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
