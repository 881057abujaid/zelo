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

    console.log("🎉 All Worlds seeded successfully!");
}

main()
    .catch((error: unknown) => {
        console.error("❌ Database seeding failed:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await disconnectDatabase();
    });