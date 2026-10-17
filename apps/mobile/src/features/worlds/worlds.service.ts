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

export async function getWorlds(): Promise<World[]> {
    const response = await api.get<WorldsResponse>("/worlds");

    return response.data.data;
}