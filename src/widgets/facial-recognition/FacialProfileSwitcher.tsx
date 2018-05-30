import * as React from 'react';
// import './face-recognition.css';
import { Subscribe } from "unstated";
import { FaceRecognitionDetection, FacialRecognitionStore } from './FacialRecognitionStore';

interface Props {
    onChangeProfile: (profile: string) => void
}

interface SwitcherProps {
    onChangeProfile: (profile: string) => void;
    detections: FaceRecognitionDetection[];
}

class Switcher extends React.Component<SwitcherProps, any> {

    timer: NodeJS.Timer;
    
    componentWillReceiveProps(nextProps: SwitcherProps) {
        
        clearTimeout(this.timer);

        if (nextProps.detections.find(d => d.name === "Unknown"))
            nextProps.onChangeProfile("unknown");

        else if (nextProps.detections.length === 0) 
            this.timer = setTimeout(() => nextProps.onChangeProfile("empty"), 10000); // wait 10 seconds before switching to empty

        else if (nextProps.detections.length === 1)
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