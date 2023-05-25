import { use } from 'react';
import { getQuests } from "@/utils/fetchQuests";
import { Container } from "@/components/Container";

export default function Home() {
    const allQuests = use(getQuests());

    return (
        <Container>
            <h1>Hello</h1>
        </Container>
    )
}
