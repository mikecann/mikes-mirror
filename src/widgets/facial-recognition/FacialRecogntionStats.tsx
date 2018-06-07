import * as React from 'react';
import { Subscribe } from "unstated";
import { FacialRecognitionStore } from './FacialRecognitionStore';

interface Props {
}

export default class FacialRecogntionStats extends React.Component<Props, any> {

    render() {

        return <Subscribe to={[FacialRecognitionStore]}>
            {
                (store: FacialRecognitionStore) =>  <div>
                    { this.renderStats(store) }
                </div>
            }
        </Subscribe>
    }

    renderStats(store: FacialRecognitionStore) {
        const arr = store.state.elapsedMs;
        const averageElapsed = Math.round(arr.reduce((p, c) => p + c, 0) / arr.length);

        return <span style={{ fontSize: "0.8em" }}>
            <i className="fa fa-video" style={{ marginRight: 5 }} /> 
                {averageElapsed} ms, 
        </span>
    }
}