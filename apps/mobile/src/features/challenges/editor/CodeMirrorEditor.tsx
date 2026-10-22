import { useEffect, useMemo, useRef, useState } from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView, { type WebViewMessageEvent } from "react-native-webview";

import { codeMirrorBundle } from "./codemirror.generated";
import type { LanguageId } from "../config/languages";

interface CodeMirrorEditorProps {
    language: LanguageId;
    value: string;
    onChange: (code: string) => void;
    editable?: boolean;
}

interface CodeMirrorWebViewProps {
    language: LanguageId;
    value: string;
    onChange: (code: string) => void;
    editable: boolean;
    fullscreen?: boolean;
}

function CodeMirrorWebView({
    language,
    value,
    onChange,
    editable,
    fullscreen = false,
}: CodeMirrorWebViewProps) {
    const webViewRef = useRef<WebView>(null);
    const onChangeRef = useRef(onChange);
    const lastEmittedCodeRef = useRef<string | null>(null);
    const readyRef = useRef(false);
    const pendingCodeRef = useRef<string | null>(null);

    onChangeRef.current = onChange;

    const html = useMemo(() => {
        const initialCode = JSON.stringify(value);
        const initialEditable = JSON.stringify(editable);
        const initialLanguage = JSON.stringify(language);

        return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
    />

    <style>
        * {
            box-sizing: border-box;
        }

        html,
        body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background: #0F172A;
            color: #E2E8F0;
            font-family: monospace;
        }

        #editor {
            width: 100%;
            height: 100%;
        }

        .cm-editor {
            width: 100%;
            height: 100%;
            font-size: 14px;
            background: #0F172A;
            color: #E2E8F0;
        }

        .cm-scroller {
            overflow: auto !important;
            font-family: monospace;
            scrollbar-width: thin;
        }

        .cm-content {
            caret-color: #4ADE80;
        }

        .cm-line {
            padding-left: 6px;
        }

        .cm-gutters {
            background: #111827;
            color: #94A3B8;
            border-right: 1px solid #334155;
        }

        .cm-activeLineGutter {
            background: #263449;
        }

        .cm-activeLine {
            background: #172338;
        }

        .cm-cursor {
            border-left-color: #4ADE80 !important;
        }

        .cm-selectionBackground {
            background: #1D4ED8 !important;
        }

        ::selection {
            background: #1D4ED8;
        }

        .cm-tooltip {
            background: #1E293B;
            color: #F8FAFC;
            border: 1px solid #475569;
        }
    </style>
</head>

<body>
    <div id="editor"></div>

    <script>
        window.INITIAL_CODE = ${initialCode};
        window.INITIAL_EDITABLE = ${initialEditable};
        window.INITIAL_LANGUAGE = ${initialLanguage};

        window.onerror = function(message) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
                type: "error",
                message: String(message)
            }));
        };
    </script>

    <script>
        ${codeMirrorBundle}
    </script>

    <script>
        try {
            const modules = window.CodeMirrorModules || {};

            const {
                EditorState,
                Compartment,
                EditorView,
                keymap,
                lineNumbers,
                highlightActiveLine,
                highlightActiveLineGutter,
                defaultKeymap,
                indentWithTab,
                indentOnInput,
                syntaxHighlighting,
                defaultHighlightStyle,
                HighlightStyle,
                tags,
                html,
                css,
                javascript
            } = modules;

            if (
                !EditorState ||
                !Compartment ||
                !EditorView ||
                !HighlightStyle ||
                !tags
            ) {
                throw new Error(
                    "CodeMirror modules are missing. Rebuild the local bundle."
                );
            }

            const editableCompartment = new Compartment();

            function getLanguageExtension(languageId) {
                switch (languageId) {
                    case "html":
                        return html();

                    case "css":
                        return css();

                    case "javascript":
                        return javascript();

                    default:
                        return [];
                }
            }

            // Undefined tags are filtered out before creating the theme.
            // This prevents HighlightStyle.define() from receiving an
            // invalid tag and throwing an error while reading tag.id.

            const highlightRules = [
                [tags.tagName, "#4ADE80"],
                [tags.keyword, "#D8B4FE"],
                [tags.string, "#86EFAC"],
                [tags.attributeValue, "#86EFAC"],
                [tags.number, "#FDBA74"],
                [tags.comment, "#94A3B8"],
                [tags.propertyName, "#7DD3FC"],
                [tags.attributeName, "#93C5FD"],
                [tags.typeName, "#FDE68A"],
                [tags.name, "#E2E8F0"],
                [tags.operator, "#67E8F9"],
                [tags.bool, "#FDBA74"],
                [tags.variableName, "#E2E8F0"],
                [tags.definition, "#C4B5FD"],
                [tags.className, "#FDE68A"],
                [tags.function, "#67E8F9"],
                [tags.special(tags.string), "#86EFAC"],
            ]
                .filter(([tag]) => Boolean(tag))
                .map(([tag, color]) => ({
                    tag,
                    color,
                    ...(tag === tags.comment
                        ? { fontStyle: "italic" }
                        : {}),
                }));

            const codeHighlightStyle = HighlightStyle.define(highlightRules);

            const darkTheme = EditorView.theme(
                {
                    "&": {
                        color: "#E2E8F0",
                        backgroundColor: "#0F172A",
                    },

                    ".cm-content": {
                        caretColor: "#4ADE80",
                    },

                    "&.cm-focused .cm-cursor": {
                        borderLeftColor: "#4ADE80",
                    },

                    ".cm-selectionBackground, ::selection": {
                        backgroundColor: "#1D4ED8",
                    },

                    ".cm-gutters": {
                        color: "#94A3B8",
                        backgroundColor: "#111827",
                    },

                    ".cm-activeLineGutter": {
                        backgroundColor: "#263449",
                    },

                    ".cm-activeLine": {
                        backgroundColor: "#172338",
                    },
                },
                { dark: true }
            );

            const state = EditorState.create({
                doc: window.INITIAL_CODE,

                extensions: [
                    lineNumbers(),
                    highlightActiveLine(),
                    highlightActiveLineGutter(),
                    indentOnInput(),

                    syntaxHighlighting(codeHighlightStyle),
                    syntaxHighlighting(defaultHighlightStyle, {
                        fallback: true,
                    }),

                    getLanguageExtension(window.INITIAL_LANGUAGE),

                    editableCompartment.of(
                        EditorView.editable.of(window.INITIAL_EDITABLE)
                    ),

                    darkTheme,

                    keymap.of([...defaultKeymap, indentWithTab]),

                    EditorView.updateListener.of((update) => {
                        if (update.docChanged) {
                            window.ReactNativeWebView.postMessage(
                                JSON.stringify({
                                    type: "code",
                                    code: update.state.doc.toString(),
                                })
                            );
                        }
                    }),

                    EditorView.lineWrapping,
                ],
            });

            const view = new EditorView({
                state,
                parent: document.getElementById("editor"),
            });

            window.setCodeFromNative = function(code) {
                if (typeof code !== "string") return;

                const currentCode = view.state.doc.toString();

                if (currentCode === code) return;

                view.dispatch({
                    changes: {
                        from: 0,
                        to: view.state.doc.length,
                        insert: code,
                    },
                });
            };

            window.setEditorEditable = function(isEditable) {
                view.dispatch({
                    effects: editableCompartment.reconfigure(
                        EditorView.editable.of(Boolean(isEditable))
                    ),
                });
            };

            window.ReactNativeWebView.postMessage(
                JSON.stringify({ type: "ready" })
            );
        } catch (error) {
            window.ReactNativeWebView.postMessage(
                JSON.stringify({
                    type: "error",
                    message: String(error),
                })
            );
        }
    </script>
</body>
</html>`;
    }, [language]);

    // Keep the editor synchronized with the React Native state.
    useEffect(() => {
        if (!readyRef.current) {
            pendingCodeRef.current = value;
            return;
        }

        if (value === lastEmittedCodeRef.current) {
            lastEmittedCodeRef.current = null;
            return;
        }

        const serializedValue = JSON.stringify(value);

        webViewRef.current?.injectJavaScript(`
            window.setCodeFromNative?.(${serializedValue});
            true;
        `);
    }, [value]);

    useEffect(() => {
        if (!readyRef.current) return;

        webViewRef.current?.injectJavaScript(`
            window.setEditorEditable?.(${JSON.stringify(editable)});
            true;
        `);
    }, [editable]);

    const handleMessage = (event: WebViewMessageEvent) => {
        try {
            const message = JSON.parse(event.nativeEvent.data);

            if (message.type === "ready") {
                readyRef.current = true;

                const latestCode = pendingCodeRef.current ?? value;
                pendingCodeRef.current = null;

                webViewRef.current?.injectJavaScript(`
                    window.setCodeFromNative?.(
                        ${JSON.stringify(latestCode)}
                    );
                    window.setEditorEditable?.(
                        ${JSON.stringify(editable)}
                    );
                    true;
                `);

                return;
            }

            if (
                message.type === "code" &&
                typeof message.code === "string"
            ) {
                lastEmittedCodeRef.current = message.code;
                onChangeRef.current(message.code);
                return;
            }

            if (message.type === "error") {
                console.error(
                    "CodeMirror WebView error:",
                    message.message
                );
            }
        } catch {
            // Ignore invalid WebView messages.
        }
    };

    return (
        <WebView
            ref={webViewRef}
            source={{
                html,
                baseUrl: "file:///android_asset/",
            }}
            onMessage={handleMessage}
            javaScriptEnabled
            domStorageEnabled
            originWhitelist={["*"]}
            style={fullscreen ? styles.fullscreenWebView : styles.webView}
            keyboardDisplayRequiresUserAction={false}
            nestedScrollEnabled
        />
    );
}

export default function CodeMirrorEditor({
    language,
    value,
    onChange,
    editable = true,
}: CodeMirrorEditorProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleCodeChange = (code: string) => {
        onChange(code);
    };

    return (
        <>
            {/* Inline editor remains visible during normal gameplay. */}
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <Text style={styles.toolbarTitle}>CODE EDITOR</Text>

                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Open fullscreen editor"
                        onPress={() => setIsFullscreen(true)}
                        style={styles.fullscreenButton}
                    >
                        <Text style={styles.fullscreenButtonText}>
                            ⛶ Fullscreen
                        </Text>
                    </Pressable>
                </View>

                <CodeMirrorWebView
                    language={language}
                    value={value}
                    onChange={handleCodeChange}
                    editable={editable}
                />
            </View>

            {/* Fullscreen editor uses the same controlled code value. */}
            <Modal
                visible={isFullscreen}
                animationType="slide"
                presentationStyle="fullScreen"
                onRequestClose={() => setIsFullscreen(false)}
            >
                <SafeAreaView
                    style={styles.fullscreenSafeArea}
                    edges={["top", "bottom"]}
                >
                    <View style={styles.fullscreenContainer}>
                        <View style={styles.toolbar}>
                            <Text style={styles.toolbarTitle}>
                                FULLSCREEN EDITOR
                            </Text>

                            <Pressable
                                accessibilityRole="button"
                                accessibilityLabel="Exit fullscreen editor"
                                onPress={() => setIsFullscreen(false)}
                                style={styles.fullscreenButton}
                            >
                                <Text style={styles.fullscreenButtonText}>
                                    ✕ Exit
                                </Text>
                            </Pressable>
                        </View>

                        <CodeMirrorWebView
                            key={`fullscreen-${language}`}
                            language={language}
                            value={value}
                            onChange={handleCodeChange}
                            editable={editable}
                            fullscreen
                        />
                    </View>
                </SafeAreaView>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 368,
        overflow: "hidden",
        backgroundColor: "#0F172A",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#334155",
    },

    toolbar: {
        minHeight: 48,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#111827",
        borderBottomWidth: 1,
        borderBottomColor: "#334155",
    },

    toolbarTitle: {
        color: "#E2E8F0",
        fontSize: 12,
        fontWeight: "700",
        letterSpacing: 1,
    },

    fullscreenButton: {
        backgroundColor: "#263449",
        borderWidth: 1,
        borderColor: "#475569",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
    },

    fullscreenButtonText: {
        color: "#F8FAFC",
        fontSize: 12,
        fontWeight: "600",
    },

    webView: {
        height: 320,
        backgroundColor: "#0F172A",
    },

    fullscreenSafeArea: {
        flex: 1,
        backgroundColor: "#0B1120",
    },

    fullscreenContainer: {
        flex: 1,
        minHeight: 0,
        backgroundColor: "#0B1120",
    },

    fullscreenWebView: {
        flex: 1,
        backgroundColor: "#0F172A",
    },
});