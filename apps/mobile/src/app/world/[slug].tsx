import { useLocalSearchParams } from "expo-router";

import WorldChallengesScreen from "@/features/worlds/WorldChallenges/WorldChallengesScreen";

export default function WorldChallengesRoute() {
    const { slug } = useLocalSearchParams<{
        slug: string;
    }>();

    if (!slug || Array.isArray(slug)) {
        return null;
    }

    return <WorldChallengesScreen slug={slug} />;
}