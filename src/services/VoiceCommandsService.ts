import { Commands } from '../widgets/voice-commands/VoiceCommandsStore';
import { AppStore } from '../stores/AppStore';
import { FacialRecognitionStore } from '../widgets/facial-recognition/FacialRecognitionStore';
import { remote } from "electron";

export class VoiceCommandsService
{
    constructor(private appStore: AppStore,
        private facialRecogntion: FacialRecognitionStore) {

    }

    createCommands(): Commands {
        return {
            "restart": () => window.close(),
            "reboot": () => window.close(),
            "exit": () => window.close(),
            "quit": () => window.close(),
            "switch profile to (.*)": (result) => this.appStore.changeProfile(result[1].toLocaleLowerCase()),
            "lock profile (.*)": (result) => this.appStore.lockProfile(result[1].toLocaleLowerCase()),
            "unlock profile": (result) => this.appStore.unlockProfile(),
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
          }
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
}