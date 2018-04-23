import * as React from 'react';
// import './face-recognition.css';
import { Subscribe } from "unstated";
import { FacialRecognitionStore, FaceRecognitionDetection } from './FaceDetectionStore';

interface Props {
    onChangeProfile: (profile: string) => void
}

interface SwitcherProps {
    onChangeProfile: (profile: string) => void;
    detections: FaceRecognitionDetection[];
}

class Switcher extends React.Component<SwitcherProps, any> {
    
    componentWillReceiveProps(nextProps: SwitcherProps) {
        if (nextProps.detections.length === 0)
            nextProps.onChangeProfile("empty");

        if (nextProps.detections.length === 1)
            nextProps.onChangeProfile(nextProps.detections[0].name);
    }

    render() {
        return "";
    }

} 

export default class FacialProfileSwitcher extends React.Component<Props, any> {

    render() {

        return <Subscribe to={[FacialRecognitionStore]}>
        {
            (store: FacialRecognitionStore) => <div className="face-recognition">
                <Switcher 
                    onChangeProfile={this.props.onChangeProfile}
                    detections={store.state.detections} 
                />
            </div>
        }
        </Subscribe>
    }
}