import { useLocalSearchParams } from "expo-router";

import ChallengeGameplayScreen from "@/features/challenges/ChallengeGameplayScreen";

export default function ChallengeGameplayRoute() {
    const { slug, challengeSlug } = useLocalSearchParams<{
        slug: string;
        challengeSlug: string;
    }>();

    if (
        !slug ||
        !challengeSlug ||
        Array.isArray(slug) ||
        Array.isArray(challengeSlug)
    ) {
        return null;
    }

    return (
        <ChallengeGameplayScreen
            worldSlug={slug}
            challengeSlug={challengeSlug}
        />
    );
}