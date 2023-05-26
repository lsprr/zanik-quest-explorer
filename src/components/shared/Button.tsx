import Image from "next/image";
import questsImage from 'public/assets/image/quests.png';
import styles from './Button.module.css';

export const Button = ({ onClick }: { onClick: React.MouseEventHandler<HTMLButtonElement>}) => {
    return (
        <div className={styles['quests-button']}>
            <button aria-label="Check Quests" onClick={onClick} className={styles['quests-button__btn']}>
                <Image src={questsImage} alt='quests icon' />
                <span className={styles['quests-button__text']}>Check Quests</span>
            </button>
        </div>
    )
}
