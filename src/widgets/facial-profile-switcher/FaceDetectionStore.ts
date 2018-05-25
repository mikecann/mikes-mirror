import * as PythonShell from "python-shell";
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

        const main = require.main;
        if (!main)
            throw new Error("require.main is undefined for some reason, cannot continue.");

        const rootDir = path.dirname(main.filename);
        console.log("Starting python service..", { rootDir });

        let lastMessage = "";

        try 
        {
            this.pyshell = new PythonShell("webcam_service.py", {
                cwd: `${rootDir}/../facial_recognition/`,
                pythonPath: "python3"
            });
    
            this.pyshell.on('message', (message: string) => {
                if (message !== lastMessage) {
                    lastMessage = message;
                    console.log(message);
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
            });
    
            this.pyshell.on('close', (message:any) => {
                console.error("FacialRecognitionStore Closed", message);
            });
    
        }
        catch(e)
        {
            console.error('Error while tryng to start the python shell', e);
        }

    }
}