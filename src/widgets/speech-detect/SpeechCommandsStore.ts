import { SpeechDetectionStore } from './SpeechDetectionStore';
import { autorun, IReactionDisposer, observable, action } from 'mobx';
import { ISpeechCommandsProvider } from './ISpeechCommandsProvider';

export class SpeechCommandsStore
{
    @observable lastCommandWasFound: boolean = false;

    private autorunDisposer?: IReactionDisposer;

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
        const commands = this.commandHandler.getCommands();
        this.lastCommandWasFound = false;
        for (var key in commands) {
            var regexp = new RegExp(key);
            if (regexp.test(command)) {
                var parts = regexp.exec(command);
                if (parts) {
                    commands[key](parts);
                    this.lastCommandWasFound = true;
                    return;
                }
            }
        }
    }

    stop() {
        if (this.autorunDisposer)
            this.autorunDisposer();
        
        this.autorunDisposer = undefined;
    }
}