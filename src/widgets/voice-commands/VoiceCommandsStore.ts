import { Container } from "unstated";
import { spawn } from "child_process";

interface VoiceEvent {
    event: "ready" | "hotword-detected" | "partial" | "error" | "final"
    hotword?: string
    error?: string
    result?: string
}

export interface State {
    event: VoiceEvent | null
}

export class VoiceCommandsStore extends Container<State> {

    pyshell: any;

    constructor() {
        super();
        this.startDetecting();
        this.state = {
            event: null
        }
    }

    private startDetecting() {

        const ls = spawn('yarn', ['start'], { cwd: "./voice_recognition" });

        ls.stdout.on('data', (data) => {
            try {
                console.log(`stdout: ${data}`);
                var event: VoiceEvent = JSON.parse(data+"");
                console.log(`event`, event);
                this.setState({ event });
            } catch (e) {
                
            }          
        });
        
        ls.stderr.on('data', (data) => {
          console.error(`VoiceCommandsStore ERROR`, data);
        });
        
        ls.on('close', (code) => {
          console.error(`VoiceCommandsStore close`, code);
        });
    }
}