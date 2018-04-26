import { stylesheet, cssRule, keyframes } from "typestyle";
import { normalize, setupPage } from "csstips";

const isProd = process.env.NODE_ENV == "production";
const prodPadding = "10px 35px 30px 30px";

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

const spinAnimName = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(359deg)' }
  })

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
    spin: {
        animation: `${spinAnimName} 1s infinite linear`
   }
})