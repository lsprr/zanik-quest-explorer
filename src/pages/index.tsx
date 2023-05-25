import { FormEvent, useState } from "react";
import { Container } from "@/components/Container";
import { Loading } from "@/components/Loading";
import { PlayerStats } from "@/components/Player/PlayerStats";
import { Player } from "@/types/player.interface";
import { Skills } from "@/types/player.interface";
import styles from '@/styles/Home.module.css'
import { Button } from "@/components/Button";

export default function Home() {
    const [username, setUsername] = useState<string>("");
    const [player, setPlayer] = useState<Player | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await fetch(`/api/hiscores?username=${username}`);
        const data: Player = await res.json();
        setPlayer(data);
        setIsLoading(false);
        setIsLoaded(true);
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
                : isLoaded && <> <PlayerStats skills={player?.skills || {} as Partial<Skills>} /> <Button /> </>
            }
        </Container>
    )
}
