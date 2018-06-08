import { spawn, ChildProcess } from "child_process";
import { observable, runInAction } from 'mobx';

type SonusEventTypes = "not-ready" | "ready" | "hotword-detected" | 
    "partial" | "error" | "final";

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

    private proc?: ChildProcess;
    
    start() {
        runInAction(() => {
            this.event = undefined;
            this.isRunning = true;
        });

        console.log(`SpeechDetectionStore starting..`);

        this.proc = spawn('yarn', ['start'], { cwd: "./voice_recognition" });

        this.proc.stdout.on('data', (data) => {
            try {
                var event: SonusEvent = JSON.parse(data + "");
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