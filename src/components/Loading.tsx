import { DotSpinner } from '@uiball/loaders'
import styles from "./Loading.module.css";

export const Loading = () => {
    return (
        <div aria-live="polite" aria-busy="true" className={styles.loadingContainer}>
            <DotSpinner size={30} speed={0.9} color="black" />
        </div>
    )
}
