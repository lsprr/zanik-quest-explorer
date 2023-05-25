import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Zanik Quest Explorer</title>
                <meta name="description"
                      content="A comprehensive, user-friendly guide to OSRS Quests. Traverse quests, skills, and mysteries of Gielinor with ease. Built with Next.js, React and Vanilla CSS. Join us as we delve into the thrilling realms of Old School Runescape together!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Component {...pageProps} />
            </main>
        </>
    )
}
