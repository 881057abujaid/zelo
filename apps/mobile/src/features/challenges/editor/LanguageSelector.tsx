import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import type {
    LanguageConfig,
    LanguageId,
} from "../config/languages";

import styles from "./LanguageSelector.styles";

interface LanguageSelectorProps {
    languages: LanguageConfig[];
    selectedLanguage: LanguageId;
    onSelect: (language: LanguageConfig) => void;
}

export default function LanguageSelector({
    languages,
    selectedLanguage,
    onSelect,
}: LanguageSelectorProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                SELECT LANGUAGE
            </Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.languageList}
            >
                {languages.map((language) => {
                    const isSelected =
                        language.id === selectedLanguage;

                    return (
                        <TouchableOpacity
                            key={language.id}
                            style={[
                                styles.languageButton,
                                isSelected &&
                                styles.selectedLanguageButton,
                            ]}
                            onPress={() => onSelect(language)}
                            activeOpacity={0.75}
                            accessibilityRole="button"
                            accessibilityState={{
                                selected: isSelected,
                            }}
                        >
                            <Text
                                style={[
                                    styles.languageText,
                                    isSelected &&
                                    styles.selectedLanguageText,
                                ]}
                            >
                                {language.label}
                            </Text>

                            {language.canRun && (
                                <View style={styles.runIndicator} />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            <Text style={styles.helperText}>
                Green indicator means execution or preview is supported.
            </Text>
        </View>
    );
}