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
    enabled: boolean;
    isRunning: boolean;
    autoRestart: boolean;
    event: FacialRecogntionEvent,
    performance: {
        locations: number,
        encodings: number,
        compareFaces: number,
        total: number
    }
}

export interface FacialRecogntionEvent
{
    event: "not-started" | "generating-encodings" | "scanning-faces" | "detecting" | "detections-update",
    detections?: FaceRecognitionDetection[],
    person?: string,
    face_locations_time?: string,
    face_encodings_time?: string,
    compare_faces_time?: string,
    total_time?: string,
}

export class FacialRecognitionStore extends Container<State> {

    pyshell: any;

    constructor(props: Partial<State>) {
        super();
        this.state = {
            detections: [],
            enabled: false,
            isRunning: false,
            event: { event: "not-started" },
            autoRestart: props.autoRestart == undefined ? false : props.autoRestart,
            performance: {
                locations: 0,
                encodings: 0,
                compareFaces: 0,
                total: 0
            }
        }
        console.log("FacialRecognitionStore CREATE!!");
    }

    public enable() {
        const { isRunning } = this.state;

        this.setState({ enabled: true });

        if (!isRunning)
            this.startDetecting();
    }

    public disable() {
        const { isRunning } = this.state;

        this.setState({ enabled: false });

        if (isRunning)
            this.stopDetecting();
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
            this.setState({ isRunning: true, detections: [], event: { event: "not-started" } });

            this.pyshell = new PythonShell("webcam_service.py", {
                cwd: `${rootDir}/../facial_recognition/`,
                pythonPath: "python3"
            });
    
            this.pyshell.on('message', (message: string) => {
                if (message !== lastMessage) {
                    lastMessage = message;
                    console.log(message);
                    try {
                        var event: FacialRecogntionEvent = JSON.parse(message);
                        this.handleEvent(event);                        
                    } catch (error) {
                        console.warn(`FacialRecognitionStore could not parse message from python '${message}'`);
                    }
                }
            });
    
            this.pyshell.on('error', (message:any) => {
                console.error("FacialRecognitionStore Error", message);

                this.setState({ isRunning: false });

                if (this.state.enabled && this.state.autoRestart)
                    this.startDetecting();

            });
    
            this.pyshell.on('close', (message:any) => {
                console.error("FacialRecognitionStore Closed", message);

                this.setState({ isRunning: false });

                if (this.state.enabled && this.state.autoRestart)
                    this.startDetecting();
            });
        }
        catch(e)
        {
            console.error('Error while tryng to start the python shell', e);
        }

    }

    private handleEvent(event: FacialRecogntionEvent)
    {
        //console.log("FacialRecognitionStore handing event", event);

        switch(event.event)
        {
            case "detections-update":
                //console.log("event.detections", event.detections)
                this.setState({
                    detections: event.detections,
                    performance: {
                        encodings: Math.round(parseFloat(event.face_encodings_time!) * 1000),
                        locations: Math.round(parseFloat(event.face_locations_time!) * 1000),
                        compareFaces: Math.round(parseFloat(event.compare_faces_time!) * 1000),
                        total: Math.round(parseFloat(event.total_time!) * 1000),
                    }
                });  
                break;
        }
          
        this.setState({ event });
    }

    private stopDetecting() {
        this.pyshell.terminate();
    }
}