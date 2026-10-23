import { api } from "@/lib/api";

export interface WorldProgress {
    slug: string;
    title: string;
    imageUrl: string | null;
    totalChallenges: number;
    completedChallenges: number;
    progressPercentage: number;
}

export interface ServerProgress {
    totalXp: number;
    totalChallenges: number;
    completedChallenges: number;
    overallProgress: number;
    worldProgress: WorldProgress[];
}

interface ServerProgressResponse {
    success: boolean;
    message: string;
    data: {
        progress: ServerProgress;
    };
}

export async function getServerProgress(): Promise<ServerProgress> {
    const response = await api.get<ServerProgressResponse>(
        "/users/me/progress",
    );

    return response.data.data.progress;
}