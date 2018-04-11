import { Container } from "unstated";
const electron = (window as any).require('electron');
const ipcRenderer  = electron.ipcRenderer;

export interface FaceRecognitionDetection {
    top: number;
    left: number;
    bottom: number;
    right: number;
    name: string;
}

export interface WebcamServiceOutput {
    detections: FaceRecognitionDetection[]
}

export interface FacialRecognitionStoreState {
    lastIPCMessage?: string;
    serviceOutput?: WebcamServiceOutput;
}

export class FacialRecognitionStore extends Container<FacialRecognitionStoreState> {

    constructor() {
        super();
        ipcRenderer.on("FaceDetectionService-onMessage", this.onFaceDetectionServiceMessage);
        this.state = {
        }
    }

    onFaceDetectionServiceMessage = (event: any, message: string) => {
        if (message !== this.state.lastIPCMessage) {
            this.setState({
                lastIPCMessage: message,
                serviceOutput: JSON.parse(message)
            });
        }
            
    }

}