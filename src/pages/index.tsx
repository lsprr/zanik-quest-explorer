import Head from 'next/head'
import { FormEvent, useState } from "react";
import { Container } from "@/components/Container";
import { Loading } from "@/components/Loading";
import { PlayerStats } from "@/components/Player/PlayerStats";
import { Player } from "@/types/player.interface";
import { Skills } from "@/types/player.interface";
import styles from '@/styles/Home.module.css'

export default function Home() {
    const [username, setUsername] = useState<string>("");
    const [player, setPlayer] = useState<Player | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await fetch(`/api/hiscores?username=${username}`);
        const data: Player = await res.json();
        setPlayer(data);
        setIsLoading(false);
    };

    return (
        <>
            <Head>
                <title>Zanik Quest Explorer</title>
                <meta name="description"
                      content="A comprehensive, user-friendly guide to OSRS Quests. Traverse quests, skills, and mysteries of Gielinor with ease. Built with Next.js, React and Vanilla CSS. Join us as we delve into the thrilling realms of Old School Runescape together!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <h1 className={styles.hiscoresHeader}>Fetch from hiscores</h1>
                <form onSubmit={handleSubmit} className={styles.hiscoresForm}>
                    <label htmlFor="username" className={"visuallyHidden"}>Username</label>
                    <input
                        placeholder="Username"
                        className={styles.hiscoresInput}
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        aria-label="Username"
                    />
                    <button type="submit" className={styles.hiscoresButton}>Lookup</button>
                </form>
                {isLoading
                    ? <Loading />
                    : <PlayerStats skills={player?.skills || {} as Partial<Skills>} />}
            </Container>
        </>
    )
}
