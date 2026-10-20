import { useEffect, useRef, useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

import type { NativeSyntheticEvent, TextInputSelectionChangeEventData } from "react-native";

import type { LanguageConfig } from "../config/languages";
import styles from "./CodeEditor.styles";

interface CodeEditorProps {
    language: LanguageConfig;
    value: string;
    onChange: (code: string) => void;
    editable?: boolean;
}

interface Selection {
    start: number;
    end: number;
}

const INDENT = "    ";

const PAIRS: Record<string, string> = {
    "{": "}",
    "(": ")",
    "[": "]",
    '"': '"',
    "'": "'",
    "`": "`",
    "<": ">",
};

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

    const opensBlock = isHtml
        ? /<([a-z][\w-]*)(?:\s[^<>]*?)?>\s*$/i.test(previousLine) &&
        !/<(?:area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)\b[^>]*\/?>\s*$/i.test(previousLine)
        : isCss
            ? /{\s*$/.test(previousLine)
            : /[{[(]\s*$/.test(previousLine);

    const closesBlock = isHtml
        ? /^\s*<\/[a-z]/i.test(currentLine)
        : /^[ \t]*[}\])]/.test(currentLine);

    if (!opensBlock && !closesBlock) {
        return newCode;
    }

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

    const [selection, setSelection] = useState<Selection | undefined>(
        undefined,
    );

    const inputRef = useRef<TextInput>(null);
    const pendingSelectionRef = useRef<Selection | null>(null);

    useEffect(() => {
        setLineCount(Math.max(value.split("\n").length, 1));
    }, [value]);

    useEffect(() => {
        if (pendingSelectionRef.current) {
            const nextSelection = pendingSelectionRef.current;

            requestAnimationFrame(() => {
                setSelection(nextSelection);
                pendingSelectionRef.current = null;
            });
        }
    }, [value]);

    const handleSelectionChange = (
        event: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
    ) => {
        const nextSelection = event.nativeEvent.selection;

        setSelection({
            start: nextSelection.start,
            end: nextSelection.end,
        });
    };

    const handleCodeChange = (newCode: string) => {
        const oldCode = value;

        // Find the first position where the old and new text differ.
        let changeStart = 0;

        while (
            changeStart < oldCode.length &&
            changeStart < newCode.length &&
            oldCode[changeStart] === newCode[changeStart]
        ) {
            changeStart++;
        }

        // Find the unchanged suffix.
        let oldSuffixIndex = oldCode.length - 1;
        let newSuffixIndex = newCode.length - 1;

        while (
            oldSuffixIndex >= changeStart &&
            newSuffixIndex >= changeStart &&
            oldCode[oldSuffixIndex] === newCode[newSuffixIndex]
        ) {
            oldSuffixIndex--;
            newSuffixIndex--;
        }

        const removedCount = oldSuffixIndex - changeStart + 1;
        const insertedCount = newSuffixIndex - changeStart + 1;

        const isSingleCharacterInsertion =
            removedCount === 0 && insertedCount === 1;

        if (isSingleCharacterInsertion) {
            const insertedCharacter = newCode[changeStart];
            const closingCharacter = PAIRS[insertedCharacter];

            if (closingCharacter) {
                const characterAfterCursor = newCode[changeStart + 1];

                // Avoid inserting a duplicate closing character.
                if (characterAfterCursor !== closingCharacter) {
                    const updatedCode =
                        newCode.slice(0, changeStart + 1) +
                        closingCharacter +
                        newCode.slice(changeStart + 1);

                    const nextCursorPosition = changeStart + 1;

                    pendingSelectionRef.current = {
                        start: nextCursorPosition,
                        end: nextCursorPosition,
                    };

                    onChange(updatedCode);
                    return;
                }
            }
        }

        const formattedCode = getSmartIndentedCode(
            oldCode,
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
                    ref={inputRef}
                    style={styles.codeInput}
                    value={value}
                    onChangeText={handleCodeChange}
                    onSelectionChange={handleSelectionChange}
                    selection={selection}
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