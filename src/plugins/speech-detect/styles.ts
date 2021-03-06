import { stylesheet } from "typestyle/lib";
import * as csstips from 'csstips';

export default stylesheet({
    fullscreen: {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 1000
    },
    rootContainer: {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      background: "rgba(0,0,0,1)",
      fontSize: "5em",
      display: "flex",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center"
    },
    ready: {
      position: "absolute",
      top: 10,
      right: 10,
      fontSize: "2em",
    },
    flex: csstips.flex,
    hozContainer: csstips.horizontal,
    vertContainer: csstips.vertical
  })
  