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
                      content="Unleash your Old School RuneScape (OSRS) questing potential with Zanik Quest Explorer. Get detailed quest info, exhaustive quest lists, and player stats assessments at your fingertips. Enhance your OSRS journey today!" />
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
