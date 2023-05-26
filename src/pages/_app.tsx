import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import { Banner } from "@/components/shared/Banner";
import { Footer } from "@/components/shared/Footer";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Zanik Quest Explorer</title>
                <meta name="description"
                      content="A comprehensive, user-friendly guide to OSRS Quests. Traverse quests, skills, and mysteries of Gielinor with ease. Built with Next.js, React and Vanilla CSS. Join us as we delve into the thrilling realms of Old School Runescape together!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>
            <Banner />
            <main>
                <Component {...pageProps} />
            </main>
            <Footer />
        </>
    )
}
