// .weather-chart {
    
//     position: absolute;
//     left: 10px;
//     bottom: 10px;
//     transform-origin: left bottom;
//     overflow: hidden;
// }

// .weather-chart>canvas { 
//     mix-blend-mode: color;
//     filter: invert(100%) grayscale(100%);
// }

// .weather-chart .spinner-container {
//     width: 820px;
//     height: 270px;
//     background: rgba(255, 255, 255, 0.1);
//     border-radius: 10px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// }

import { stylesheet } from 'typestyle';

export default stylesheet({
    canvas: {
        mixBlendMode: "color",
        filter: "invert(100%) grayscale(100%)"
    },
    loading: {
        width: 820,
        height: 270,
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
})