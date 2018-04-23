import { stylesheet } from "typestyle/lib";
import * as csstips from 'csstips';

export default stylesheet({
    profile: {
      width: "100%",
      height: "100%"
    },
    rootContainer: {
      width: "100%",
      height: "100%",
      ...csstips.vertical
    },
    flex: csstips.flex,
    hozContainer: csstips.horizontal,
    vertContainer: csstips.vertical
  })
  