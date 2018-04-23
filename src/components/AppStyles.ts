import { stylesheet, cssRule } from "typestyle/lib";

cssRule(".profile-enter", {
    opacity: 0.01
});

cssRule(".profile-enter.profile-enter-active", {
    opacity: 1,
    transition: "opacity 500ms ease-in"
});

cssRule(".profile-leave", {
    opacity: 1,
});

cssRule(".profile-leave.profile-leave-active", {
    opacity: 0.01,
    transition: "opacity 300ms ease-in"
});

export default stylesheet({
    app: {
        // cursor: "none",
        width: "100%",
        height: "100%",
        position: "relative"
    },
    profiles: {
        width: "100%",
        height: "100%",
    }
})