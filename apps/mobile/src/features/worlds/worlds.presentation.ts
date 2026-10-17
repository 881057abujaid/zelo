export interface WorldTheme {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    technologies: string[];
    illustration: string;
}

const worldThemes: Record<string, WorldTheme> = {
    frontend: {
        background: "#DDF8F3",
        surface: "#F0FFFB",
        primary: "#16A878",
        secondary: "#8CE9D7",
        technologies: ["HTML", "CSS", "JS", "React"],
        illustration: "🏝️",
    },

    backend: {
        background: "#FFF0D8",
        surface: "#FFF9F0",
        primary: "#F07832",
        secondary: "#FFC78C",
        technologies: ["Node.js", "Express", "API", "DB"],
        illustration: "🏰",
    },

    fullstack: {
        background: "#EEE4FF",
        surface: "#F8F3FF",
        primary: "#7C3AED",
        secondary: "#C7B0FF",
        technologies: ["React", "Node.js", "SQL", "Cloud"],
        illustration: "🪄",
    },

    default: {
        background: "#E7F0FF",
        surface: "#F5F8FF",
        primary: "#4777D5",
        secondary: "#B6D0FF",
        technologies: ["CODE", "API", "DB"],
        illustration: "🌍",
    },
};

export function getWorldTheme(
    slug: string,
    title: string,
): WorldTheme {
    const identifier = `${slug} ${title}`.toLowerCase();

    if (identifier.includes("frontend") || identifier.includes("front-end")) {
        return worldThemes.frontend;
    }

    if (identifier.includes("backend") || identifier.includes("back-end")) {
        return worldThemes.backend;
    }

    if (identifier.includes("fullstack") || identifier.includes("full-stack")) {
        return worldThemes.fullstack;
    }

    return worldThemes.default;
}