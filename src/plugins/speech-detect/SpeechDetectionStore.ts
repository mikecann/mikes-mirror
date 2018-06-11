import { spawn, ChildProcess } from "child_process";
import { observable, runInAction, toJS } from 'mobx';

type SonusEventTypes = "not-ready" | "ready" | "hotword-detected" | 
    "partial" | "error" | "final" | "silence" | "sound";

export interface SonusEvent {
    event: SonusEventTypes,
    hotword?: string
    error?: string
    result?: string
}

export class SpeechDetectionStore {

    @observable enabled = true;
    @observable autoRestart = true;
    @observable isRunning = false;
    @observable event?: SonusEvent;
    @observable hasSound = false;

    private proc?: ChildProcess;
    private lastData: string;
    
    start() {
        runInAction(() => {
            this.event = undefined;
            this.isRunning = true;
        });

        console.log(`SpeechDetectionStore starting..`);

        this.proc = spawn('yarn', ['start'], { cwd: "./voice_recognition" });

        this.proc.stdout.on('data', (data) => {
            var str = data + "";

            try {
                if (str == this.lastData)
                    return;

                this.lastData = str;

                var event: SonusEvent = JSON.parse(str);

                //console.log("Speech event", event);

                if (event.event == "sound") {
                    runInAction(() => this.hasSound = true);
                    return
                }

                if (event.event == "silence") {
                    runInAction(() => this.hasSound = false);
                    return;
                }
                
                runInAction(() => this.event = event);
                    
            } catch (e) {
                console.warn(`SpeechDetectionStore failed to parse sonus event`, e, str);
            }
        });

        this.proc.stderr.on('error', (data) => {
            console.error(`SpeechDetectionStore ERROR`, data);
        });

        this.proc.on('close', (code) => {
            console.log(`SpeechDetectionStore close`, code);

            runInAction(() => this.isRunning = false);

            if (this.enabled && this.autoRestart)
                this.start();
        });
    }

    stop() {
        if (this.proc && !this.proc.killed)
            this.proc.kill();
    }
}