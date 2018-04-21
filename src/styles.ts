import { stylesheet, cssRule } from "typestyle";
import {normalize, setupPage} from "csstips";

export function setupStyles(root: string = "#root") {
    normalize();
    setupPage(root);
    cssRule("body", {
        fontFamily: "'Roboto', sans-serif",
        color: "white",
        backgroundColor: "black",
        fontWeight: 100,
        overflow: "hidden"
    });
}

export const common = stylesheet({
    dimmed: {
        color: "#666",
        fontWeight: 300,
    },
    normal: {
        color: "#999",
        fontWeight: 300,
    },
    bright: {
        color: "#fff"
    },
})