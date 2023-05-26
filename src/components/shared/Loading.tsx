import { DotSpinner } from '@uiball/loaders'
import styles from "./Loading.module.css";

export const Loading = ({ className, color }: { className?: string, color?: string }) => {
    return (
        <div aria-live="polite" aria-busy="true" className={`${styles['loading-container']} ${className ? className : ''}`}>
            <DotSpinner size={30} speed={0.9} color={color ? color : "yellow"} />
        </div>
    )
}
