import { stylesheet } from 'typestyle';

export default stylesheet({
    particles: {
        $nest: {
            canvas: {
                position: "absolute",
                width: "100%",
                height: "100%"
            }
        }
    },
})