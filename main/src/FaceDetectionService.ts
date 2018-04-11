import * as PythonShell from "python-shell";

export class FaceDetectionService {

    private pyshell: any;

    startDetecting() {

        console.log("Starting python service....");

        this.pyshell = new PythonShell("webcam_service.py", {
            cwd: "../facial_recognition/examples/",
            pythonPath: "python3"
        });

        this.pyshell.on('message', function (message:any ) {
            console.log("msg: "+message);
        });

        this.pyshell.on('error', function (message:any ) {
            console.error("PythonServiceController Error", message);
        });

        this.pyshell.on('close', function (message:any ) {
            console.error("PythonServiceController Closed", message);
        });

    }

    stopDetecting() {
        this.pyshell.end(function (err: any, code: any, signal: any) {
            if (err) throw err;
            console.log('The exit code was: ' + code);
            console.log('The exit signal was: ' + signal);
            console.log('finished');
            console.log('finished');
          });
    }
}