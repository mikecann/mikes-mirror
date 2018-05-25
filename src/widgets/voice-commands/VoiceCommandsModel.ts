import { spawn } from "child_process";
import { observable } from 'mobx';

interface VoiceEvent {
    event: 'ready' | "hotword-detected" | "partial" | "error",
    hotword?: string,
    result?: string,
    error?: string
}

// export interface State {
//     lastEvent?: VoiceEvent
// }

export class VoiceCommandsModel {

    @observable lastEvent: VoiceEvent | null = null;

    startDetecting() {
        const ls = spawn('yarn', ['start'], { cwd: "./voice_recognition" });

        ls.stdout.on('data', (data) => {
            try{
                console.log(`stdout: ${data}`);
                var event: VoiceEvent = JSON.parse(data+"");
                this.lastEvent = event;
            }
            catch(e)
            {
            }
        });

        ls.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        ls.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
       
    }
}