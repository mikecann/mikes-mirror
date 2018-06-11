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
            try {

                if (data+"" == this.lastData)
                    return;

                this.lastData = data + "";

                var event: SonusEvent = JSON.parse(data + "");

                //console.log("Speech event", event);

                if (event.event == "sound")
                    return runInAction(() => this.hasSound = true);

                if (event.event == "silence")
                    return runInAction(() => this.hasSound = false);
                
                runInAction(() => this.event = event);
                    
            } catch (e) {
                console.warn(`SpeechDetectionStore failed to parse sonus event`, data);
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