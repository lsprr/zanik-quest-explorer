import Styles from './Container.module.css';

export const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className={Styles.container}>
            <div className={Styles.OSRS}>
                {children}
            </div>
        </section>
    )
}