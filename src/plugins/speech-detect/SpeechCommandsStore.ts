import { SpeechDetectionStore } from './SpeechDetectionStore';
import { autorun, IReactionDisposer, observable, action, runInAction } from 'mobx';
import { ISpeechCommandsProvider } from './ISpeechCommandsProvider';

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
        private commandHandler: ISpeechCommandsProvider) {
    }

    start() {
        this.autorunDisposer = autorun(() => {
            const { event } = this.speechDetection;
            if (event && event.event == "final")
                this.attemptToExecute(event.result!);
        })
    }

    @action
    private attemptToExecute(command: string) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => runInAction(() => this.command = undefined), 2000);
        this.command = this.findCommand(command);
    }

    private findCommand(command: string): SpeechCommand {
        const commands = this.commandHandler.getCommands();
        for (var key in commands) {
            var regexp = new RegExp(key);
            if (regexp.test(command)) {
                var parts = regexp.exec(command);
                if (parts) {
                    commands[key](parts);
                    return { input: command, match: key };
                }
            }
        }
        return { input: command };
    }

    stop() {
        if (this.autorunDisposer)
            this.autorunDisposer();
        
        this.autorunDisposer = undefined;
    }
}