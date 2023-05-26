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
import { QuestList } from "@/components/Quest/QuestList";

export default function Home() {
    const [searchedUsername, setSearchedUsername] = useState<string>("");
    const [searchedPlayer, setSearchedPlayer] = useState<Player | null>(null);
    const [allQuests, setAllQuests] = useState<Quest[]>([]);
    const [isQuestsFetched, setIsQuestsFetched] = useState(false);
    const [isLoadingSearchedPlayer, setIsLoadingSearchedPlayer] = useState(false);
    const [isLoadingAllQuests, setIsLoadingAllQuests] = useState(false);
    const [isNoSearchedPlayerFound, setIsNoSearchedPlayerFound] = useState(false);
    const [lastSearchedFailedUsername, setIsLastSearchedFailedUsername] = useState<string>("");
    const [isSearchedPlayerLoaded, setIsSearchedPlayerLoaded] = useState(false);

    useEffect(() => {
        const fetchQuests = async () => {
            setIsLoadingAllQuests(true);
            try {
                const questsData = await getQuests();
                setAllQuests(questsData);
            } catch (error) {
                console.error('Failed to fetch quests', error);
            } finally {
                setIsLoadingAllQuests(false);
                setIsQuestsFetched(false);
            }
        };
        if (isQuestsFetched) {
            setIsLoadingAllQuests(true);
            fetchQuests();
        }
    }, [isQuestsFetched]);

    const handleUsernameSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoadingSearchedPlayer(true);
        setSearchedPlayer(null);
        setAllQuests([]);
        try {
            const res = await fetch(`/api/hiscores?username=${searchedUsername}`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data: Player = await res.json();
            setIsNoSearchedPlayerFound(false);
            setSearchedPlayer(data);
            setIsSearchedPlayerLoaded(true);
        } catch (error) {
            console.error(`No player "${searchedUsername}" found`);
            setIsLastSearchedFailedUsername(searchedUsername);
            setIsNoSearchedPlayerFound(true);
        } finally {
            setIsLoadingSearchedPlayer(false);
        }
    };

    const handleLoadAllQuests = () => {
        setIsQuestsFetched(true);
    }

    return (
        <>
            <Container>
                <div className={styles['hiscores-container']}>
                    <h1 className={styles['hiscores-container__header']}>Fetch from hiscores</h1>
                    {isNoSearchedPlayerFound && <NoPlayerFound username={lastSearchedFailedUsername} />}
                    <form onSubmit={handleUsernameSearch} className={styles['hiscores-container__form']}>
                        <label htmlFor="username" className={"visually-hidden"}>Username</label>
                        <input
                            placeholder="Username"
                            className={styles['hiscores-container__input']}
                            type="text"
                            id="username"
                            value={searchedUsername}
                            onChange={(e) => setSearchedUsername(e.target.value)}
                            aria-label="Username"
                        />
                        <button type="submit" className={styles['hiscores-container__button']}>Lookup</button>
                    </form>
                    <PlayerStats skills={searchedPlayer?.skills || {} as Partial<Skills>} />
                    {isLoadingSearchedPlayer && <Loading />}
                    {searchedPlayer && !isNoSearchedPlayerFound && <Button onClick={handleLoadAllQuests} />}
                </div>
                <div>
                    {isLoadingAllQuests
                        ? <Loading />
                        : allQuests.length > 0 &&
						<QuestList skills={searchedPlayer?.skills || {} as Partial<Skills>}
						           quests={allQuests} />
                    }
                </div>
            </Container>
        </>
    );
}
