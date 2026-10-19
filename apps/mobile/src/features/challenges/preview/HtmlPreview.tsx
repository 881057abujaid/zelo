import { useMemo } from "react";
import {
    ActivityIndicator,
    Text,
    View,
} from "react-native";
import WebView from "react-native-webview";

import styles from "./HtmlPreview.styles";

interface HtmlPreviewProps {
    html: string;
    css?: string;
    visible?: boolean;
}

export default function HtmlPreview({
    html,
    css = "",
    visible = true,
}: HtmlPreviewProps) {
    const previewDocument = useMemo(() => {
        const hasHtmlDocument =
            /<!doctype\s+html|<html[\s>]/i.test(html);

        const documentContent = hasHtmlDocument
            ? html
            : `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ZELO Preview</title>
</head>
<body>
    ${html}
</body>
</html>`;

        if (!css.trim()) {
            return documentContent;
        }

        const styleTag = `<style>${css}</style>`;

        if (/<\/head>/i.test(documentContent)) {
            return documentContent.replace(
                /<\/head>/i,
                `${styleTag}</head>`,
            );
        }

        return documentContent.replace(
            /<body[\s>]/i,
            `${styleTag}<body`,
        );
    }, [html, css]);

    if (!visible) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.statusIndicator} />

                <Text style={styles.title}>
                    LIVE PREVIEW
                </Text>

                <Text style={styles.badge}>
                    HTML
                </Text>
            </View>

            <View style={styles.previewArea}>
                <WebView
                    source={{ html: previewDocument }}
                    style={styles.webView}
                    originWhitelist={["*"]}
                    javaScriptEnabled={false}
                    domStorageEnabled={false}
                    startInLoadingState
                    renderLoading={() => (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator
                                size="small"
                                color="#16A34A"
                            />

                            <Text style={styles.loadingText}>
                                Loading preview...
                            </Text>
                        </View>
                    )}
                    setSupportMultipleWindows={false}
                    allowFileAccess={false}
                    allowUniversalAccessFromFileURLs={false}
                />
            </View>
        </View>
    );
}