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
                    onChangeText={onChange}
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