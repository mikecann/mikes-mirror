import { Container } from "unstated";
import { spawn } from "child_process";

export interface VoiceEvent {
    event: "not-ready" | "ready" | "hotword-detected" | "partial" | "error" | "final"
    hotword?: string
    error?: string
    result?: string
}

export type Commands = {
    [key : string]: (result: RegExpExecArray) => void
}

export interface State {
    event: VoiceEvent,
    enabled?: boolean,
    autoRestart?: boolean,
    hotword?: string
}

export class VoiceCommandsStore extends Container<State> {

    private resetTimeout: NodeJS.Timer;


    constructor(private commands: Commands, initialState: Partial<State>) {
        super();
        this.startDetecting();
        this.state = {
            event: {
                event: "not-ready",
            },
            ...initialState
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
                    this.handleFinal(event);
                else
                    clearTimeout(this.resetTimeout);

            } catch (e) {

            }
        });

        ls.stderr.on('data', (data) => {
            console.error(`VoiceCommandsStore ERROR`, data);
        });

        ls.on('close', (code) => {
            console.log(`VoiceCommandsStore close`, code);

            if (this.state.enabled && this.state.autoRestart)
                this.startDetecting();
        });
    }

    private handleFinal(event: VoiceEvent) {
        this.resetTimeout = setTimeout(() => this.setState({
            event: {
                event: "ready",
                hotword: this.state.hotword
            }
        }), 2000);

        if (!event.result)
            return;

        for (var key in this.commands) {
            var regexp = new RegExp(key);
            if (regexp.test(event.result)) {
                var parts = regexp.exec(event.result);
                if (parts) {
                    this.commands[key](parts);
                    return;
                }
            }
        }
    }
}