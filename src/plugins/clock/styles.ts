import { stylesheet } from 'typestyle';

export default stylesheet({
    clock: {
        maxWidth: 400,
        marginTop: "-1.1em",
    },
    hoursMins: {
        fontSize: "8em",
    },
    seconds: {
      fontSize: "3em",
      paddingLeft: ".1em"
    },
    date: {
        borderTop: "1px solid #333",
        fontSize: "1.6em",
        marginTop: "-0.5em",
        paddingTop: "0.1em",
        fontWeight: 100
    },
    dateIcon: {
        fontSize: "1em",
        marginRight: "0.2em",
        paddingTop: "0.2em"
    }
})