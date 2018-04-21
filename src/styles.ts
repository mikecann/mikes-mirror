// html {
//   width: 100%;
//   height: 100%;
// }

// body {
//   margin: 0;
//   padding: 0;
//   font-family: 'Roboto', sans-serif;
//   color: white;
//   background-color: black;
//   font-weight: 100;
//   width: 100%;
//   height: 100%;
//   overflow: hidden;
// }

// #root {
//   width: 100%;
//   height: 100%;
// }

// .dimmed {
//   color: #666;
//   font-weight: 300;
// }

// .normal {
//   color: #999;
//   font-weight: 300;
// }

// .bright {
//   color: #fff;
// }

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