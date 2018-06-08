import { FacialRecognitionStore } from '../plugins/facial-recognition/FacialRecognitionStore';
import { remote } from "electron";
import { TextToSpeechService } from '../plugins/text-to-speech/TextToSpeechService';
import { ProfilesStore } from '../plugins/profiles/ProfilesStore';
import { AppProfiles } from '../profiles/AppProfiles';
import { ISpeechCommandsProvider } from '../plugins/speech-detect/ISpeechCommandsProvider';

export type Commands = {
    [key: string]: (result: RegExpExecArray) => void
}

export class MirrorSpeechCommandsProvider implements ISpeechCommandsProvider {
    constructor(private profiles: ProfilesStore<AppProfiles>,
        private facialRecogntion: FacialRecognitionStore,
        private textToSpeech: TextToSpeechService
    ) {
    }

    private commands: Commands = {
        "restart": () => window.close(),
        "reboot": () => window.close(),
        "exit": () => window.close(),
        "quit": () => window.close(),
        "switch profile to (.*)": (result) => this.profiles.changeProfile(result[1].toLocaleLowerCase()),
        "lock profile (.*)": (result) => this.profiles.lockProfile(result[1].toLocaleLowerCase()),
        "unlock profile": (result) => this.profiles.unlockProfile(),
        "toggle inspector": () => this.toggleInspector(),
        "open inspector": () => this.openInspector(),
        "close inspector": () => this.closeInspector(),
        "show inspector": () => this.openInspector(),
        "hide inspector": () => this.closeInspector(),
        "enable facial recognition": () => this.facialRecogntion.enable(),
        "disable facial recognition": () => this.facialRecogntion.disable(),
        "stop facial recognition": () => this.facialRecogntion.enable(),
        "start facial recognition": () => this.facialRecogntion.disable(),
        "stop face recognition": () => this.facialRecogntion.enable(),
        "start face recognition": () => this.facialRecogntion.disable(),
        "disable face recognition": () => this.facialRecogntion.enable(),
        "enable face recognition": () => this.facialRecogntion.disable(),
        "say (.*)": (result) => this.textToSpeech.say(result[1]),
        "who is the fairest of them all": (result) => this.textToSpeech.say("everyone knows that olivia is the fairest of them all")
    }

    toggleInspector() {
        var window = remote.getCurrentWindow();
        window.webContents.isDevToolsOpened ?
            window.webContents.closeDevTools() :
            window.webContents.openDevTools()
    }

    openInspector() {
        var window = remote.getCurrentWindow();
        window.webContents.openDevTools();
    }

    closeInspector() {
        var window = remote.getCurrentWindow();
        window.webContents.closeDevTools();
    }

    getCommands(): Commands {
        return this.commands;
    }
}