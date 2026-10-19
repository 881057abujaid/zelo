import { useEffect, useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

import type { LanguageConfig } from "../config/languages";
import styles from "./CodeEditor.styles";

interface CodeEditorProps {
    language: LanguageConfig;
    value: string;
    onChange: (code: string) => void;
    editable?: boolean;
}

const INDENT = "    ";

function getSmartIndentedCode(
    previousCode: string,
    newCode: string,
    languageId: string,
): string {
    if (newCode.length <= previousCode.length) {
        return newCode;
    }

    const addedText = newCode.length - previousCode.length;

    if (!newCode.includes("\n")) {
        return newCode;
    }

    const previousLines = previousCode.split("\n");
    const newLines = newCode.split("\n");

    if (newLines.length <= previousLines.length) {
        return newCode;
    }

    const previousLine = previousLines[previousLines.length - 1] ?? "";
    const currentLine = newLines[newLines.length - 1] ?? "";

    const indentation = previousLine.match(/^[ \t]*/)?.[0] ?? "";

    const isHtml = languageId === "html";
    const isCss = languageId === "css";

    const opensBlock =
        isHtml
            ? /<([a-z][\w-]*)(?:\s[^<>]*?)?>\s*$/i.test(previousLine) &&
            !/<(?:area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)\b[^>]*\/?>\s*$/i.test(previousLine)
            : isCss
                ? /{\s*$/.test(previousLine)
                : /[{[(]\s*$/.test(previousLine);

    const closesBlock =
        isHtml
            ? /^\s*<\/[a-z]/i.test(currentLine)
            : /^[ \t]*[}\])]/.test(currentLine);

    if (!opensBlock && !closesBlock) {
        return newCode;
    }

    // React Native TextInput doesn't expose a native Enter key event
    // through onChangeText, so only transform a simple inserted newline.
    if (addedText > 2) {
        return newCode;
    }

    const expectedIndent = opensBlock
        ? `${indentation}${INDENT}`
        : indentation;

    const lastNewlineIndex = newCode.lastIndexOf("\n");

    if (lastNewlineIndex === -1) {
        return newCode;
    }

    const beforeLastLine = newCode.slice(0, lastNewlineIndex + 1);
    const lastLine = newCode.slice(lastNewlineIndex + 1);

    if (lastLine.trim().length > 0) {
        return newCode;
    }

    return `${beforeLastLine}${expectedIndent}`;
}

export default function CodeEditor({
    language,
    value,
    onChange,
    editable = true,
}: CodeEditorProps) {
    const [lineCount, setLineCount] = useState(
        Math.max(value.split("\n").length, 1),
    );

    useEffect(() => {
        setLineCount(Math.max(value.split("\n").length, 1));
    }, [value]);

    const handleCodeChange = (newCode: string) => {
        const formattedCode = getSmartIndentedCode(
            value,
            newCode,
            language.id,
        );

        onChange(formattedCode);
    };

    return (
        <View style={styles.container}>
            {/* Editor Header */}
            <View style={styles.header}>
                <View style={styles.fileInfo}>
                    <View style={styles.fileIndicator} />

                    <Text style={styles.fileName}>
                        main.{language.fileExtension}
                    </Text>
                </View>

                <Text style={styles.languageLabel}>
                    {language.label}
                </Text>
            </View>

            {/* Code Area */}
            <View style={styles.editorBody}>
                {/* Line Numbers */}
                <ScrollView
                    style={styles.lineNumberContainer}
                    contentContainerStyle={styles.lineNumberContent}
                    scrollEnabled={false}
                >
                    {Array.from(
                        { length: lineCount },
                        (_, index) => (
                            <Text
                                key={index + 1}
                                style={styles.lineNumber}
                            >
                                {index + 1}
                            </Text>
                        ),
                    )}
                </ScrollView>

                {/* Editable Code */}
                <TextInput
                    style={styles.codeInput}
                    value={value}
                    onChangeText={handleCodeChange}
                    multiline
                    editable={editable}
                    autoCapitalize="none"
                    autoCorrect={false}
                    spellCheck={false}
                    textAlignVertical="top"
                    scrollEnabled
                    placeholder={`Start writing ${language.label} code...`}
                    placeholderTextColor="#64748B"
                    selectionColor="#16A34A"
                    accessibilityLabel={`${language.label} code editor`}
                />
            </View>

            {/* Editor Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    {lineCount} lines
                </Text>

                <Text style={styles.footerText}>
                    {language.fileExtension.toUpperCase()}
                </Text>
            </View>
        </View>
    );
}