import * as React from 'react';
import { FacialRecognitionStore } from './FacialRecognitionStore';
import { observer, inject } from 'mobx-react';

interface Props {
    facialStore?: FacialRecognitionStore;
}

@inject("facialStore")
@observer
export default class FacialProfileStatusIcon extends React.Component<Props, any> {

    render() {

        const { enabled, event } = this.props.facialStore!;

        if (enabled) {

            if (event && event.event == "detections-update" && event.detections)
                if (event.detections.length != 0)
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
    <div>
        <span className="fa fa-video" style={{ opacity: 0.5, fontSize: "2em" }} />
    </div>

const NotReady = () =>
    <div>
        <span className="fa fa-video" style={{ color: "orange", fontSize: "2em" }} />
    </div>;

const NoDetections = () =>
    <div>
        <span className="fa fa-video" style={{ color: "white", fontSize: "2em" }} />
    </div>;

const DetectionsFound = () =>
    <div>
        <span className="fa fa-video" style={{ color: "green", fontSize: "2em" }} />
    </div>;