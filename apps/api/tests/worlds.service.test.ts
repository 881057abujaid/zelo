import { beforeEach, describe, expect, it, vi } from "vitest";

const { findManyMock } = vi.hoisted(() => ({
    findManyMock: vi.fn(),
}));

vi.mock("@/config/prisma.js", () => ({
    prisma: {
        world: {
            findMany: findManyMock,
        },
    },
}));

import { getPublishedWorlds } from "../src/modules/worlds/worlds.service.js";

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
        const error = new Error("Database connection failed");

        findManyMock.mockRejectedValue(error);

        await expect(getPublishedWorlds()).rejects.toThrow(
            "Database connection failed"
        );
    });
});