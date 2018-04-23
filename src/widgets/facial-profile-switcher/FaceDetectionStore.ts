import * as PythonShell from "python-shell";
import { BrowserWindow } from "electron";
import { Container } from "unstated";


export interface FaceRecognitionDetection {
    top: number;
    left: number;
    bottom: number;
    right: number;
    name: string;
}

export interface State {
    detections: FaceRecognitionDetection[];
}

export class FacialRecognitionStore extends Container<State> {

    pyshell: any;

    constructor() {
        super();
        this.startDetecting();
        this.state = {
            detections: []
        }
    }

    private startDetecting() {
        console.log("Starting python service....");

        let lastMessage = "";

        this.pyshell = new PythonShell("webcam_service.py", {
            cwd: "../facial_recognition/",
            pythonPath: "python3"
        });

        this.pyshell.on('message', (message: string) => {
            console.log("FacialRecognitionStore Message: ", message);
            if (message !== lastMessage) {
                lastMessage = message;
                this.setState({
                    detections: JSON.parse(message).detections
                });
            }
        });

        this.pyshell.on('error', (message:any) => {
            console.error("FacialRecognitionStore Error", message);
            // this.window.webContents.send("FaceDetectionService-onError", message);
        });

        this.pyshell.on('close', (message:any) => {
            console.error("FacialRecognitionStore Closed", message);
            // this.window.webContents.send("FaceDetectionService-onClose", message);
        });
    }

    private stopDetecting() {
        this.pyshell.end(function (err: any, code: any, signal: any) {
            if (err) throw err;
            console.log('The exit code was: ' + code);
            console.log('The exit signal was: ' + signal);
            console.log('finished');
          });
    }
}