export type LanguageId =
    | "html"
    | "css"
    | "javascript"
    | "typescript"
    | "python"
    | "java"
    | "c"
    | "cpp"
    | "csharp"
    | "go"
    | "php"
    | "sql";

export type LanguageCategory =
    | "web"
    | "programming"
    | "database";

export interface LanguageConfig {
    id: LanguageId;
    label: string;
    category: LanguageCategory;
    fileExtension: string;
    starterCode: string;
    canRun: boolean;
    canPreview: boolean;
}

export const LANGUAGES: LanguageConfig[] = [
    {
        id: "html",
        label: "HTML",
        category: "web",
        fileExtension: "html",
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
</head>
<body>
    <h1>Hello, ZELO!</h1>
    <p>My coding journey starts here.</p>
</body>
</html>`,
        canRun: true,
        canPreview: true,
    },
    {
        id: "css",
        label: "CSS",
        category: "web",
        fileExtension: "css",
        starterCode: `body {
    font-family: Arial, sans-serif;
    background: #f5f5f5;
    color: #222222;
}

h1 {
    color: #16A34A;
}`,
        canRun: false,
        canPreview: true,
    },
    {
        id: "javascript",
        label: "JavaScript",
        category: "web",
        fileExtension: "js",
        starterCode: `function greet() {
    return "Hello, ZELO!";
}

console.log(greet());`,
        canRun: false,
        canPreview: false,
    },
    {
        id: "typescript",
        label: "TypeScript",
        category: "web",
        fileExtension: "ts",
        starterCode: `function greet(name: string): string {
    return \`Hello, \${name}!\`;
}

console.log(greet("ZELO"));`,
        canRun: false,
        canPreview: false,
    },
    {
        id: "python",
        label: "Python",
        category: "programming",
        fileExtension: "py",
        starterCode: `def greet():
    return "Hello, ZELO!"

print(greet())`,
        canRun: false,
        canPreview: false,
    },
    {
        id: "java",
        label: "Java",
        category: "programming",
        fileExtension: "java",
        starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, ZELO!");
    }
}`,
        canRun: false,
        canPreview: false,
    },
    {
        id: "c",
        label: "C",
        category: "programming",
        fileExtension: "c",
        starterCode: `#include <stdio.h>

int main(void) {
    printf("Hello, ZELO!\\n");
    return 0;
}`,
        canRun: false,
        canPreview: false,
    },
    {
        id: "cpp",
        label: "C++",
        category: "programming",
        fileExtension: "cpp",
        starterCode: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, ZELO!" << endl;
    return 0;
}`,
        canRun: false,
        canPreview: false,
    },
    {
        id: "csharp",
        label: "C#",
        category: "programming",
        fileExtension: "cs",
        starterCode: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, ZELO!");
    }
}`,
        canRun: false,
        canPreview: false,
    },
    {
        id: "go",
        label: "Go",
        category: "programming",
        fileExtension: "go",
        starterCode: `package main

import "fmt"

func main() {
    fmt.Println("Hello, ZELO!")
}`,
        canRun: false,
        canPreview: false,
    },
    {
        id: "php",
        label: "PHP",
        category: "web",
        fileExtension: "php",
        starterCode: `<?php

function greet(): string {
    return "Hello, ZELO!";
}

echo greet();`,
        canRun: false,
        canPreview: false,
    },
    {
        id: "sql",
        label: "SQL",
        category: "database",
        fileExtension: "sql",
        starterCode: `SELECT 'Hello, ZELO!' AS message;`,
        canRun: false,
        canPreview: false,
    },
];