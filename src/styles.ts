import { stylesheet, cssRule } from "typestyle";
import {normalize, setupPage, padding} from "csstips";

const isProd = process.env.NODE_ENV == "production";
const prodPadding = "10px 10px 30px 20px";

export function setupStyles(root: string = "#root") {
    normalize();
    setupPage(root);
    cssRule("body", {
        fontFamily: "'Roboto', sans-serif",
        color: "white",
        backgroundColor: "black",
        fontWeight: 100,
        overflow: "hidden",
        padding: isProd ? prodPadding : 0,
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