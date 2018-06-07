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

        if (enabled) {

            if (event.event == "detections-update")
                if (detections.length != 0)
                    return <DetectionsFound />
                else
                    return <NoDetections />
            else
                return <NotReady />
        }
        else {
            return <Disabled />
        }
    }
}

const Disabled = () =>
    <div className={css.ready}>
        <span className="fa fa-video" style={{ opacity: 0.5 }} />
    </div>

const NotReady = () =>
    <div className={css.ready}>
        <span className="fa fa-video" style={{ color: "orange" }} />
    </div>;

const NoDetections = () =>
    <div className={css.ready}>
        <span className="fa fa-video" style={{ color: "white" }} />
    </div>;

const DetectionsFound = () =>
    <div className={css.ready}>
        <span className="fa fa-video" style={{ color: "green" }} />
    </div>;

// const IconBadge = (props: { num: number, style?: any }) => 
//     <span className="fa-layers fa-fw">
//         <i className="fas fa-video" style={props.style}></i>
//         <span className="fa-layers-counter" style={{background: "Tomato"}}>12456</span>
//     </span>