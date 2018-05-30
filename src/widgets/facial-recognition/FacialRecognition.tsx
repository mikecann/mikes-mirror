import * as React from 'react';
import { Subscribe } from "unstated";
import { FacialRecognitionStore } from './FacialRecognitionStore';
import css from "./styles";

interface Props {
}

export default class FacialRecognition extends React.Component<Props, any> {

    render() {

        return <Subscribe to={[FacialRecognitionStore]}>
            {
                (store: FacialRecognitionStore) => <div className={css.facialRecognition}>
                    {this.renderStates(store)}
                </div>
            }
        </Subscribe>
    }

    renderStates(store: FacialRecognitionStore) {

        const { enabled, event, detections } = store.state;

        const hasDetections = detections.length > 0;
        const isDetecting = event.event === "detections-update";

        if (enabled)
            return <Enabled hasDetections={hasDetections} isDetecting={isDetecting} />

        if (!enabled)
            return <Disabled />

        return <Unknown />
    }
}

const Disabled = () =>
    <div className={css.ready}>
        <span className="fa fa-video" style={{ opacity: 0.5 }} />
    </div>

const Enabled = (props: { isDetecting: boolean, hasDetections: boolean }) => {

    //let colour = props.hasDetections ? "green" : "white";

    return <div className={css.ready}>
        <span className="fa fa-video" style={{ color: "white" }} />
    </div>;
}


const Unknown = () => {
    return <div className={css.ready}>
        <span className="fa fa-video" style={{ color: "red" }} />
    </div>
}
