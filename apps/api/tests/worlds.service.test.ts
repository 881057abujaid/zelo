import { beforeEach, describe, expect, it, vi } from "vitest";

const { findManyMock, findFirstMock } = vi.hoisted(() => ({
    findManyMock: vi.fn(),
    findFirstMock: vi.fn(),
}));

vi.mock("@/config/prisma.js", () => ({
    prisma: {
        world: {
            findMany: findManyMock,
            findFirst: findFirstMock,
        },
    },
}));

import {
    getPublishedWorldChallenges,
    getPublishedWorlds,
} from "../src/modules/worlds/worlds.service.js";

describe("getPublishedWorlds", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should return published worlds", async () => {
        const mockWorlds = [
            {
                id: "world-1",
                slug: "frontend",
                title: "Frontend World",
                description: "Learn frontend development.",
                icon: "🌐",
                sortOrder: 1,
            },
            {
                id: "world-2",
                slug: "backend",
                title: "Backend World",
                description: "Learn backend development.",
                icon: "⚙️",
                sortOrder: 2,
            },
            {
                id: "world-3",
                slug: "full-stack",
                title: "Full Stack World",
                description: "Build full-stack applications.",
                icon: "🔗",
                sortOrder: 3,
            },
        ];

        findManyMock.mockResolvedValue(mockWorlds);

        const result = await getPublishedWorlds();

        expect(result).toEqual(mockWorlds);
        expect(findManyMock).toHaveBeenCalledTimes(1);
    });

    it("should query only published worlds in ascending order", async () => {
        findManyMock.mockResolvedValue([]);

        await getPublishedWorlds();

        expect(findManyMock).toHaveBeenCalledWith({
            where: {
                isPublished: true,
            },
            select: {
                id: true,
                slug: true,
                title: true,
                description: true,
                icon: true,
                sortOrder: true,
            },
            orderBy: {
                sortOrder: "asc",
            },
        });
    });

    it("should return an empty array when no published worlds exist", async () => {
        findManyMock.mockResolvedValue([]);

        const result = await getPublishedWorlds();

        expect(result).toEqual([]);
    });

    it("should propagate database errors", async () => {
        findManyMock.mockRejectedValue(
            new Error("Database connection failed")
        );

        await expect(getPublishedWorlds()).rejects.toThrow(
            "Database connection failed"
        );
    });
});

describe("getPublishedWorldChallenges", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should return published challenges for a world", async () => {
        const mockWorld = {
            id: "world-1",
            challenges: [
                {
                    id: "challenge-1",
                    slug: "html-basics",
                    title: "HTML Basics",
                    description: "Learn HTML fundamentals.",
                    instructions: "Create your first HTML element.",
                    difficulty: "EASY",
                    xpReward: 10,
                    orderIndex: 1,
                },
                {
                    id: "challenge-2",
                    slug: "css-basics",
                    title: "CSS Basics",
                    description: "Learn CSS fundamentals.",
                    instructions: "Style an HTML element.",
                    difficulty: "EASY",
                    xpReward: 15,
                    orderIndex: 2,
                },
            ],
        };

        findFirstMock.mockResolvedValue(mockWorld);

        const result = await getPublishedWorldChallenges("frontend");

        expect(result).toEqual(mockWorld);
        expect(findFirstMock).toHaveBeenCalledTimes(1);
    });

    it("should query a published world and its published challenges in order", async () => {
        findFirstMock.mockResolvedValue({
            id: "world-1",
            challenges: [],
        });

        await getPublishedWorldChallenges("frontend");

        expect(findFirstMock).toHaveBeenCalledWith({
            where: {
                slug: "frontend",
                isPublished: true,
            },
            select: {
                id: true,
                challenges: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        description: true,
                        instructions: true,
                        difficulty: true,
                        xpReward: true,
                        orderIndex: true,
                    },
                    orderBy: {
                        orderIndex: "asc",
                    },
                },
            },
        });
    });

    it("should return null when the world does not exist or is unpublished", async () => {
        findFirstMock.mockResolvedValue(null);

        const result = await getPublishedWorldChallenges("unknown-world");

        expect(result).toBeNull();
    });

    it("should propagate database errors", async () => {
        findFirstMock.mockRejectedValue(
            new Error("Database connection failed")
        );

        await expect(
            getPublishedWorldChallenges("frontend")
        ).rejects.toThrow("Database connection failed");
    });
});