import { stylesheet } from 'typestyle/lib';
// .profile-picture {
//     filter: grayscale(100%);
//     position: absolute;
//     right: 10px;
//     top: 10px;
//     /* transform-origin: right top; */
// }

// .profile-picture>img {
//     height: 100px;
//     border-radius: 8px;
// }

export default stylesheet({
    container: {
        filter: "grayscale(100%)"
    },
    img: {
        height: 100,
        borderRadius: 8   
    }
})