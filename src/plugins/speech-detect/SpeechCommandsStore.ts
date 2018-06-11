import { SpeechDetectionStore } from './SpeechDetectionStore';
import { autorun, IReactionDisposer, observable, action, runInAction } from 'mobx';
import NLC = require("natural-language-commander")

interface SpeechCommand {
    input: string,
    match?: string,
}

export class SpeechCommandsStore
{
    @observable command?: SpeechCommand;

    private autorunDisposer?: IReactionDisposer;
    private timeout: NodeJS.Timer;

    constructor(private speechDetection: SpeechDetectionStore,
        private nlc: NLC) {
    }

    start() {
        this.autorunDisposer = autorun(() => {
            const { event } = this.speechDetection;
            if (event && event.event == "final")
                this.attemptToExecute(event.result!);
        })
    }

    @action
    private async attemptToExecute(command: string) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => runInAction(() => this.command = undefined), 2000);

        try {
            const intent = await this.nlc.handleCommand(command);
            console.log("Command executed", { command, intent })
            runInAction(() => this.command = { input: command, match: intent });
        } catch (error) {
            runInAction(() => this.command = { input: command });
        }
    }

    stop() {
        if (this.autorunDisposer)
            this.autorunDisposer();
        
        this.autorunDisposer = undefined;
    }
}