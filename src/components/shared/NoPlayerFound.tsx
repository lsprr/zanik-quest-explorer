import styles from './NoPlayerFound.module.css';

export const NoPlayerFound = ({ username }: { username: string }) => {
    return (
        <p className={styles['player-not-found']}>No player <b className={styles['player-not-found__highlight']}>&quot;{username}&quot;</b> found</p>
    )
}