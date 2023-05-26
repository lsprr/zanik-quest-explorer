import styles from "./Footer.module.css";

export const Footer = () => {
    return (
        <div className={styles.footer}>
            <p>
                Here in the &lsquo;Zanik Quest Explorer&lsquo;, we pride ourselves on being dedicated fans of Old School RuneScape
                (OSRS), created by the grand masters of online gaming - Jagex. While we&lsquo;re passionate about our creative
                work, it&lsquo;s important to make it clear that we don&lsquo;t claim ownership of any intellectual property
                connected with Jagex or OSRS.
            </p>
            <p>
                All the graphical assets and distinctive characteristics that you come across on this site, as well as
                within its repository, remain the exclusive property of Jagex Ltd. We&lsquo;ve merely used these resources to
                pay homage to the game we love and respect so much, and to support our fellow adventurers on their epic
                quests. This is not a commercial enterprise; it&lsquo;s a tribute, and an educational endeavour.
            </p>
            <p>
                May your levels always rise, and your inventory be forever full of cake!
            </p>
        </div>
    )
}