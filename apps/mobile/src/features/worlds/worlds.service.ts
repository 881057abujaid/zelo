import { api } from "@/lib/api";

export interface World {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    sortOrder: number;
}

interface WorldsResponse {
    success: boolean;
    message: string;
    data: World[];
}

export interface WorldChallenge {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    instructions: string;
    difficulty: string;
    xpReward: number;
    orderIndex: number;
}

interface WorldChallengesResponse {
    success: boolean;
    message: string;
    data: WorldChallenge[];
}

export async function getWorlds(): Promise<World[]> {
    const response = await api.get<WorldsResponse>("/worlds");

    return response.data.data;
}

export async function getWorldChallenges(
    slug: string,
): Promise<WorldChallenge[]> {
    const response = await api.get<WorldChallengesResponse>(
        `/worlds/${encodeURIComponent(slug)}/challenges`,
    );

    return response.data.data;
}