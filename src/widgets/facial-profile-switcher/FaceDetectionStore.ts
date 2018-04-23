import * as PythonShell from "python-shell";
import { BrowserWindow } from "electron";
import { Container } from "unstated";
import * as path from 'path';


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

        const rootDir = path.dirname(require.main.filename);
        console.log("Starting python service..", { rootDir });

        let lastMessage = "";

        try 
        {
            this.pyshell = new PythonShell("webcam_service.py", {
                cwd: `${rootDir}/../facial_recognition/`,
                pythonPath: "python3"
            });
    
            this.pyshell.on('message', (message: string) => {
                // console.log("FacialRecognitionStore Message: ", message);
                if (message !== lastMessage) {
                    lastMessage = message;
                    try {
                        this.setState({
                            detections: JSON.parse(message).detections
                        });    
                    } catch (error) {
                        console.error(`Could not parse message from python '${message}'`);
                    }
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
        catch(e)
        {
            console.error('Error while tryng to start the python shell', e);
        }

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