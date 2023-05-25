import styles from './NoPlayerFound.module.css';

export const NoPlayerFound = ({ username }: { username: string }) => {
    return (
        <p className={styles.noPlayerFoundContainer}>No player <b>"{username}"</b> found</p>
    )
}