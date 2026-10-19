import { useLocalSearchParams } from "expo-router";

import ChallengeGameplayScreen from "@/features/challenges/ChallengeGameplayScreen";

export default function ChallengeGameplayRoute() {
    const {
        slug,
        challengeSlug,
        title,
        description,
        instructions,
        difficulty,
        xpReward,
    } = useLocalSearchParams<{
        slug: string;
        challengeSlug: string;
        title?: string;
        description?: string;
        instructions?: string;
        difficulty?: string;
        xpReward?: string;
    }>();

    return (
        <ChallengeGameplayScreen
            worldSlug={slug}
            challengeSlug={challengeSlug}
            title={title}
            description={description}
            instructions={instructions}
            difficulty={difficulty}
            xpReward={
                xpReward ? Number(xpReward) : undefined
            }
        />
    );
}