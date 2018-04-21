import * as PythonShell from "python-shell";
import { BrowserWindow } from "electron";

export class FaceDetectionService {

    private pyshell: any;

    constructor(private window: BrowserWindow) {

    }

    start() {
        this.startDetecting();
    }

    private startDetecting() {
        console.log("Starting python service....");

        this.pyshell = new PythonShell("webcam_service.py", {
            cwd: "../facial_recognition/examples/",
            pythonPath: "python3"
        });

        this.pyshell.on('message', (message: any) => {
            // console.log("msg: " + message);
            this.window.webContents.send("FaceDetectionService-onMessage", message+"");
        });

        this.pyshell.on('error', (message:any) => {
            console.error("PythonServiceController Error", message);
            this.window.webContents.send("FaceDetectionService-onError", message);
        });

        this.pyshell.on('close', (message:any) => {
            console.error("PythonServiceController Closed", message);
            this.window.webContents.send("FaceDetectionService-onClose", message);
        });
    }

    stop() {
        this.stopDetecting();
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