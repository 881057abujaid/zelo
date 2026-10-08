import { router, useLocalSearchParams } from "expo-router";

import WorldCompletionScreen from "@/features/worldCompletion/WorldCompletionScreen";

export default function WorldCompletionRoute() {
    const {
        completedChallenges,
        xpEarned,
    } = useLocalSearchParams<{
        completedChallenges?: string;
        xpEarned?: string;
    }>();

    const completedCount = Number(
        completedChallenges ?? 0
    );

    const totalXp = Number(
        xpEarned ?? 0
    );

    return (
        <WorldCompletionScreen
            completedChallenges={completedCount}
            xpEarned={totalXp}
            onContinue={() => {
                router.replace("/");
            }}
        />
    );
}