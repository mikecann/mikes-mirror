import { Container } from "unstated";
import { spawn } from "child_process";

type SonusEventTypes = "not-ready" | "ready" | "hotword-detected" | 
    "partial" | "error" | "final";

type MirrorEventTypes = "command-not-found" | "command-found";

type CombinedEventTypes = SonusEventTypes | MirrorEventTypes;

export interface SonusEvent {
    event: SonusEventTypes,
    hotword?: string
    error?: string
    result?: string
}

export type Commands = {
    [key : string]: (result: RegExpExecArray) => void
}

export interface State {
    state: CombinedEventTypes,
    result?: string,
    error?: string,
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
            state: "not-ready",
            ...initialState
        }
    }

    private startDetecting() {

        const ls = spawn('yarn', ['start'], { cwd: "./voice_recognition" });

        ls.stdout.on('data', (data) => {
            try {
                var event: SonusEvent = JSON.parse(data + "");

                this.setState({
                    state: event.event,
                    error: event.error,
                    hotword: event.hotword,
                    result: event.result
                });

                if (event.event == "final")
                    this.handleFinal(event);
                else
                    clearTimeout(this.resetTimeout);

            } catch (e) {
                console.warn(`VoiceCommandsStore failed to parse sonus event`, e);
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

    private handleFinal(event: SonusEvent) {
        
        this.resetTimeout = setTimeout(() => this.setState({
            state: "ready",
        }), 2000);

        var executedCommand = this.findAndExecuteMatchingCommand(event);
        if (executedCommand == null)
            this.setState({ state: "command-not-found" });
        else 
            this.setState({ state: "command-found" });
    }

    private findAndExecuteMatchingCommand(event: SonusEvent): string | null {

        if (!event.result)
            return null;

        for (var key in this.commands) {
            var regexp = new RegExp(key);
            if (regexp.test(event.result)) {
                var parts = regexp.exec(event.result);
                if (parts) {
                    this.commands[key](parts);
                    return key;
                }
            }
        }

        return null;
    }
}