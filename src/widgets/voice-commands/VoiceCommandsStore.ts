import { Container } from "unstated";
import { spawn } from "child_process";

export interface VoiceEvent {
    event: "not-ready" | "ready" | "hotword-detected" | "partial" | "error" | "final"
    hotword?: string
    error?: string
    result?: string
}

export interface State {
    event: VoiceEvent,
    hotword?: string
}

export class VoiceCommandsStore extends Container<State> {

    private resetTimeout: NodeJS.Timer;

    constructor() {
        super();
        this.startDetecting();
        this.state = {
            event: {
                event: "not-ready"
            },
        }
    }

    private startDetecting() {

        const ls = spawn('yarn', ['start'], { cwd: "./voice_recognition" });

        ls.stdout.on('data', (data) => {
            try {
                //console.log(`stdout: ${data}`);
                var event: VoiceEvent = JSON.parse(data + "");
                //console.log(`event`, event);
                this.setState({
                    event,
                    hotword: event.event == "ready" ? event.hotword : undefined
                });

                if (event.event == "final")
                    this.resetTimeout = setTimeout(() => this.setState({
                        event: {
                            event: "ready",
                            hotword: this.state.hotword
                        }
                    }), 2000);
                else
                    clearTimeout(this.resetTimeout);

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