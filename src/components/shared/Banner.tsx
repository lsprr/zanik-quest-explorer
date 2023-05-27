import Image from "next/image";
import osrsLogo from "/public/assets/image/osrslogo.png";
import styles from "./Banner.module.css";

export const Banner = () => {
    return (
        <Image className={styles.banner} src={osrsLogo} alt='Old School Runescape Logo' loading={"eager"} />
    )
}