import * as PythonShell from "python-shell";
import * as path from 'path';
import { observable, action, runInAction, computed } from "mobx";

export type EventType = "generating-encodings" | "scanning-faces" | "detecting" | "detections-update";

export interface FaceRecognitionDetection {
    top: number;
    left: number;
    bottom: number;
    right: number;
    name: string;
}

export interface FacialRecogntionEvent {
    event: EventType,
    detections?: FaceRecognitionDetection[],
    person?: string,
    total_time?: string,
}

export class FacialRecognitionStore {

    private pyshell: any;

    @observable enabled: boolean = true;
    @observable isRunning: boolean = false;
    @observable autoRestart: boolean = true;
    @observable event?: FacialRecogntionEvent;
    @observable elapsedMs: number[] = [1];

    @action
    public enable() {
        this.enabled = true;
        if (!this.isRunning)
            this.startDetecting();
    }

    @action
    public disable() {
        this.enabled = false;
        if (this.isRunning)
            this.stopDetecting();
    }

    private startDetecting() {

        const main = require.main;
        if (!main)
            throw new Error("require.main is undefined for some reason, cannot continue.");

        const rootDir = path.dirname(main.filename);

        try {
            this.pyshell = new PythonShell("webcam_service.py", {
                cwd: `${rootDir}/../facial_recognition/`,
                pythonPath: "python3"
            });

            this.pyshell.on('message', (message: string) => {
                try {
                    console.log(message);
                    var event: FacialRecogntionEvent = JSON.parse(message);
                    this.handleEvent(event);
                } catch (error) {
                    console.warn(`FacialRecognitionStore could not parse message from python '${message}'`, error);
                }
            });

            this.pyshell.on('error', (message: any) => {
                console.error("FacialRecognitionStore Error", message);
                runInAction(() => this.isRunning = false);
                if (this.enabled && this.autoRestart)
                    this.startDetecting();

            });

            this.pyshell.on('close', (message: any) => {
                console.error("FacialRecognitionStore Closed", message);
                runInAction(() => this.isRunning = false);
                if (this.enabled && this.autoRestart)
                    this.startDetecting();
            });

            runInAction(() => this.isRunning = true);
        }
        catch (e) {
            console.error('Error while tryng to start the python shell', e);
        }

    }

    saveFrame(profileName: string) {
        if (!this.enabled)
            return;

        this.pyshell.send(JSON.stringify({ command: "saveFrame", profileName }));
    }

    @action
    private handleEvent(event: FacialRecogntionEvent) {
        //console.log("FacialRecognitionStore handing event", event);

        this.event = event;

        if (event.event != "detections-update")
            return;

        //console.log("event.detections", event.detections)
        const ms = Math.round(parseFloat(event.total_time!) * 1000);
        this.elapsedMs.push(ms);
        this.elapsedMs.shift();
    }

    @computed
    get averageElapsedMs() {
        return Math.round(this.elapsedMs.reduce((p, c) => p + c, 0) / this.elapsedMs.length)
    }

    private stopDetecting() {
        this.pyshell.terminate();
    }
}