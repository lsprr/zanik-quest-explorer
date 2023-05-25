import Image from "next/image";
import questsImage from 'public/assets/image/quests.png';
import styles from './Button.module.css';

export const Button = () => {
    return (
        <div className={styles.questsButtonContainer}>
            <Image src={questsImage} alt='quests icon' />
            <button role="button" aria-label="Check Quests">
                Check Quests
            </button>
        </div>
    )
}
