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