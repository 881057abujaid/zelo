import { prisma, disconnectDatabase } from "../src/config/prisma.js";

const worlds = [
    {
        slug: "frontend",
        title: "Frontend World",
        description:
            "Learn HTML, CSS, JavaScript, and React to build beautiful, interactive user interfaces.",
        icon: "🌐",
        sortOrder: 1,
        isPublished: true,
    },
    {
        slug: "backend",
        title: "Backend World",
        description:
            "Learn Node.js, Express.js, REST APIs, and server-side development.",
        icon: "⚙️",
        sortOrder: 2,
        isPublished: true,
    },
    {
        slug: "full-stack",
        title: "Full Stack World",
        description:
            "Master MongoDB and combine frontend and backend skills to build complete MERN applications.",
        icon: "🔗",
        sortOrder: 3,
        isPublished: true,
    },
];

const frontendChallenges = [
    {
        slug: "first-html-element",
        title: "Meet Your First HTML Element",
        description: "Learn how HTML elements define the structure of a webpage.",
        instructions: [
            "HTML is the foundation of every webpage.",
            "An HTML element usually consists of an opening tag, content, and a closing tag.",
            "For example, <h1>Hello World</h1> creates a level-one heading.",
            "Understand the difference between an HTML tag and an HTML element.",
        ].join("\n\n"),
        difficulty: "EASY" as const,
        xpReward: 10,
        orderIndex: 1,
        isPublished: true,
    },
    {
        slug: "create-page-heading",
        title: "Create a Page Heading",
        description: "Learn to use HTML heading elements.",
        instructions: [
            "HTML provides six heading levels, from <h1> to <h6>.",
            "The <h1> element represents the highest-level heading.",
            "Create a heading that displays: Welcome to ZELO!",
            "Use the appropriate HTML heading element.",
        ].join("\n\n"),
        difficulty: "EASY" as const,
        xpReward: 10,
        orderIndex: 2,
        isPublished: true,
    },
    {
        slug: "first-html-paragraph",
        title: "Write Your First Paragraph",
        description: "Learn how to display text using HTML paragraphs.",
        instructions: [
            "The <p> element represents a paragraph.",
            "Paragraphs help organize readable text on a webpage.",
            "Create a paragraph that displays: I am learning HTML with ZELO.",
            "Use a paragraph element to wrap the text.",
        ].join("\n\n"),
        difficulty: "EASY" as const,
        xpReward: 10,
        orderIndex: 3,
        isPublished: true,
    },
    {
        slug: "simple-html-profile",
        title: "Build a Simple HTML Profile",
        description: "Combine headings and paragraphs to create a basic profile.",
        instructions: [
            "Create a level-one heading containing your name.",
            "Add a paragraph introducing yourself.",
            "Add another paragraph describing what you want to learn.",
            "Use semantic HTML elements to structure your content.",
        ].join("\n\n"),
        difficulty: "EASY" as const,
        xpReward: 20,
        orderIndex: 4,
        isPublished: true,
    },
];

const htmlTestCases = [
    {
        challengeSlug: "first-html-element",
        title: "Contains an HTML heading",
        input: {
            requiredElement: "h1",
        },
        expected: {
            containsElement: "h1",
        },
        isHidden: false,
        orderIndex: 1,
    },
    {
        challengeSlug: "create-page-heading",
        title: "Contains the required heading text",
        input: {
            requiredText: "Welcome to ZELO!",
            requiredElement: "h1",
        },
        expected: {
            containsText: "Welcome to ZELO!",
            containsElement: "h1",
        },
        isHidden: false,
        orderIndex: 1,
    },
    {
        challengeSlug: "first-html-paragraph",
        title: "Contains the required paragraph",
        input: {
            requiredText: "I am learning HTML with ZELO.",
            requiredElement: "p",
        },
        expected: {
            containsText: "I am learning HTML with ZELO.",
            containsElement: "p",
        },
        isHidden: false,
        orderIndex: 1,
    },
    {
        challengeSlug: "simple-html-profile",
        title: "Contains a heading and paragraphs",
        input: {
            requiredElements: ["h1", "p"],
            minimumParagraphs: 2,
        },
        expected: {
            containsElements: ["h1", "p"],
            minimumParagraphs: 2,
        },
        isHidden: false,
        orderIndex: 1,
    },
];

const achievements = [
    {
        slug: "first-code",
        title: "First Code",
        description: "Complete your first coding challenge.",
        icon: "🏆",
        xpRequired: null,
        isPublished: true,
    },
    {
        slug: "bug-hunter",
        title: "Bug Hunter",
        description: "Complete 5 coding challenges.",
        icon: "🐛",
        xpRequired: null,
        isPublished: true,
    },
    {
        slug: "streak-starter",
        title: "Streak Starter",
        description: "Maintain a 3-day learning streak.",
        icon: "🔥",
        xpRequired: null,
        isPublished: true,
    },
    {
        slug: "api-explorer",
        title: "API Explorer",
        description: "Complete your first REST API challenge.",
        icon: "🌐",
        xpRequired: null,
        isPublished: true,
    },
    {
        slug: "database-rookie",
        title: "Database Rookie",
        description: "Complete your first database challenge.",
        icon: "🗄️",
        xpRequired: null,
        isPublished: true,
    },
    {
        slug: "mern-builder",
        title: "MERN Builder",
        description: "Complete your first full-stack MERN project.",
        icon: "🚀",
        xpRequired: null,
        isPublished: true,
    },
];

async function main() {
    console.log("🌱 ZELO database seeding started...");

    for (const world of worlds) {
        const result = await prisma.world.upsert({
            where: {
                slug: world.slug,
            },
            update: {
                title: world.title,
                description: world.description,
                icon: world.icon,
                sortOrder: world.sortOrder,
                isPublished: world.isPublished,
            },
            create: world,
        });

        console.log(`✅ World seeded: ${result.title}`);
    }

    const frontendWorld = await prisma.world.findUnique({
        where: {
            slug: "frontend",
        },
        select: {
            id: true,
        },
    });

    if (!frontendWorld) {
        throw new Error("Frontend World not found. Seeding failed.");
    }

    for (const challenge of frontendChallenges) {
        const result = await prisma.challenge.upsert({
            where: {
                worldId_slug: {
                    worldId: frontendWorld.id,
                    slug: challenge.slug,
                },
            },
            update: {
                title: challenge.title,
                description: challenge.description,
                instructions: challenge.instructions,
                difficulty: challenge.difficulty,
                xpReward: challenge.xpReward,
                orderIndex: challenge.orderIndex,
                isPublished: challenge.isPublished,
            },
            create: {
                ...challenge,
                worldId: frontendWorld.id,
            },
        });

        console.log(`✅ Challenge seeded: ${result.title}`);
    }

    for (const testCase of htmlTestCases) {
        const challenge = await prisma.challenge.findUnique({
            where: {
                worldId_slug: {
                    worldId: frontendWorld.id,
                    slug: testCase.challengeSlug,
                },
            },
            select: {
                id: true,
            },
        });

        if (!challenge) {
            throw new Error(
                `Challenge not found: ${testCase.challengeSlug}`,
            );
        }

        const existingTestCases = await prisma.challengeTestCase.findMany({
            where: {
                challengeId: challenge.id,
                title: testCase.title,
            },
            select: {
                id: true,
            },
        });

        if (existingTestCases.length > 0) {
            await prisma.challengeTestCase.update({
                where: {
                    id: existingTestCases[0].id,
                },
                data: {
                    input: testCase.input,
                    expected: testCase.expected,
                    isHidden: testCase.isHidden,
                    orderIndex: testCase.orderIndex,
                },
            });
        } else {
            await prisma.challengeTestCase.create({
                data: {
                    challengeId: challenge.id,
                    title: testCase.title,
                    input: testCase.input,
                    expected: testCase.expected,
                    isHidden: testCase.isHidden,
                    orderIndex: testCase.orderIndex,
                },
            });
        }

        console.log(`✅ Test case seeded: ${testCase.title}`);
    }

    for (const achievement of achievements) {
        const result = await prisma.achievement.upsert({
            where: {
                slug: achievement.slug,
            },
            update: {
                title: achievement.title,
                description: achievement.description,
                icon: achievement.icon,
                xpRequired: achievement.xpRequired,
                isPublished: achievement.isPublished,
            },
            create: achievement,
        });

        console.log(`✅ Achievement seeded: ${result.title}`);
    }

    console.log("🎉 All Worlds, Challenges, Test Cases, and Achievements seeded successfully!");
}

main()
    .catch((error: unknown) => {
        console.error("❌ Database seeding failed:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await disconnectDatabase();
    });