import * as React from 'react';
import './face-recognition.css';

interface State {
}

export default class FaceRecognition extends React.Component<any, State> {

    constructor(props: any) {
        super(props);
        this.state = {
        }
    }

    render() {
        return <div className="face-recognition">
            face recog
        </div>
    }
}