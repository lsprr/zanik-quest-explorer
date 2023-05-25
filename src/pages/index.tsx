import { FormEvent, useEffect, useState } from "react";
import { getQuests } from "@/utils/fetchQuests";
import { Player } from "@/types/player.interface";
import { Quest } from "@/types/quests.interface";
import { Skills } from "@/types/player.interface";
import styles from '@/styles/Home.module.css'

import { Container } from "@/components/shared/Container";
import { Loading } from "@/components/shared/Loading";
import { Button } from "@/components/shared/Button";
import { NoPlayerFound } from "@/components/shared/NoPlayerFound";
import { PlayerStats } from "@/components/Player/PlayerStats";

export default function Home() {
    const [username, setUsername] = useState<string>("");
    const [player, setPlayer] = useState<Player | null>(null);
    const [quests, setQuests] = useState<Quest[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [noPlayerFound, setNoPlayerFound] = useState(false);
    const [lastFailedUsername, setLastFailedUsername] = useState<string>("");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchQuests = async () => {
            try {
                const questsData = await getQuests();
                setQuests(questsData);
            } catch (error) {
                console.error('Failed to fetch quests', error);
            }
        };
        fetchQuests();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(`/api/hiscores?username=${username}`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data: Player = await res.json();
            setNoPlayerFound(false);
            setPlayer(data);
            setIsLoaded(true);
        } catch (error) {
            console.error(`No player "${username}" found`);
            setLastFailedUsername(username);
            setNoPlayerFound(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
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
                : isLoaded && <><PlayerStats skills={player?.skills || {} as Partial<Skills>} /> <Button /></>
            }
            {noPlayerFound && <NoPlayerFound username={lastFailedUsername} />}
        </Container>
    );
}
