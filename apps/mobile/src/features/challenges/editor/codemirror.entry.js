import { EditorState, Compartment } from "@codemirror/state";
import {
    EditorView,
    keymap,
    lineNumbers,
    highlightActiveLine,
    highlightActiveLineGutter,
} from "@codemirror/view";
import {
    defaultKeymap,
    indentWithTab,
} from "@codemirror/commands";
import {
    HighlightStyle,
    indentOnInput,
    syntaxHighlighting,
    defaultHighlightStyle,
} from "@codemirror/language";

import { tags } from "@lezer/highlight";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";

window.CodeMirrorModules = {
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
    HighlightStyle,
    defaultHighlightStyle,
    tags,
    html,
    css,
    javascript,
};