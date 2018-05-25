import { Container } from "unstated";

export interface State {
}

export class VoiceCommandsStore extends Container<State> {

    pyshell: any;

    constructor() {
        super();
        this.startDetecting();
        this.state = {
        }
    }

    private startDetecting() {

       
    }
}