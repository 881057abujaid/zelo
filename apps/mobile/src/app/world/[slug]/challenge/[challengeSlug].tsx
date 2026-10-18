import { useLocalSearchParams } from "expo-router";

import ChallengeDetailsScreen from "@/features/worlds/WorldChallenges/ChallengeDetailsScreen";

export default function ChallengeDetailsRoute() {
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
        <ChallengeDetailsScreen
            worldSlug={slug}
            challengeSlug={challengeSlug}
        />
    );
}