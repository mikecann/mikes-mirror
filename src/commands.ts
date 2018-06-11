import { ProfilesStore } from './plugins/profiles/ProfilesStore';
import { AppProfiles } from './profiles/AppProfiles';
import { FacialRecognitionStore } from './plugins/facial-recognition/FacialRecognitionStore';
import { TextToSpeechService } from './plugins/text-to-speech/TextToSpeechService';
import NLC = require("natural-language-commander")
import { remote } from "electron";
import { toJS } from 'mobx';

const inspectorSlotType = "INSPECTOR_SLOT_TYPE";
const openSlotType = "OPEN_SLOT_TYPE";
const closeSlotType = "CLOSE_SLOT_TYPE";
const facialRecogntionSlotType = "FACIAL_RECOGNITION_SLOT_TYPE";
const saveCaptureTakeSlotType = "SAVE_CAPTURE_TAKE_SLOT_TYPE";

export function registerCommands(
    nlc: NLC, profiles: ProfilesStore<AppProfiles>,
    facialRecogntion: FacialRecognitionStore,
    textToSpeech: TextToSpeechService) {

    const window = remote.getCurrentWindow();

    nlc.addSlotType({
        type: inspectorSlotType,
        matcher: ["inspector", "dev tools", "devtools", "chrome devtools", "sidebar", "debug panel", "debug"]
    })

    nlc.addSlotType({
        type: openSlotType,
        matcher: ["open", "show", "display", "present", "turn on", "add"]
    })

    nlc.addSlotType({
        type: closeSlotType,
        matcher: ["close", "hide", "turn off", "remove"]
    })

    nlc.addSlotType({
        type: facialRecogntionSlotType,
        matcher: ["facial recognition", "face recogntion", "face detection", "face detect", "facial detection", "facial detect", "camera"]
    })

    nlc.addSlotType({
        type: saveCaptureTakeSlotType,
        matcher: ["save", "capture", "take", "record"]
    })

    nlc.registerIntent({
        intent: "lock profile",
        utterances: ["lock profile", "lock my profile"],
        callback: () => profiles.lockProfile()
    });

    nlc.registerIntent({
        intent: "lock profile to..",
        slots: [{ name: "Profile", type: "STRING" }],
        utterances: ["lock profile to {Profile}", "fix profile {Profile}"],
        callback: (profile: string) => {
            profiles.unlockProfile();
            profiles.changeProfile(profile);
            profiles.lockProfile();
        }
    });

    nlc.registerIntent({
        intent: "unlock profile",
        utterances: ["unlock profile", "unlock my profile"],
        callback: () => profiles.unlockProfile()
    });

    nlc.registerIntent({
        intent: "restart",
        utterances: ["restart", "reboot", "exit", "quit", "stop"],
        callback: () => window.close()
    });

    nlc.registerIntent({
        intent: "switch profile",
        slots: [{ name: "Profile", type: "STRING" }],
        utterances: ["switch profile to {Profile}", "switch profile {Profile}", "change profile to {Profile}", "change profile {Profile}", "set profile {Profile}", "set profile to {Profile}"],
        callback: (profile: string) => profiles.changeProfile(profile.toLowerCase())
    });

    nlc.registerIntent({
        intent: "toggle inspector",
        slots: [{ name: "Inspector", type: inspectorSlotType }],
        utterances: ["toggle {Inspector}"],
        callback: () => {
            window.webContents.isDevToolsOpened() ?
            window.webContents.closeDevTools() :
            window.webContents.openDevTools()
        }
    });

    nlc.registerIntent({
        intent: "open inspector",
        slots: [
            { name: "Inspector", type: inspectorSlotType },
            { name: "Open", type: openSlotType },
        ],
        utterances: ["{Open} {Inspector}"],
        callback: () => window.webContents.openDevTools()
    });

    nlc.registerIntent({
        intent: "close inspector",
        slots: [
            { name: "Inspector", type: inspectorSlotType },
            { name: "Close", type: closeSlotType },
        ],
        utterances: ["{Close} {Inspector}"],
        callback: () => window.webContents.closeDevTools()
    });

    nlc.registerIntent({
        intent: "togle facial recognition",
        slots: [{ name: "Facial", type: facialRecogntionSlotType }],
        utterances: ["toggle {Facial}"],
        callback: () => facialRecogntion.toggle()
    });

    nlc.registerIntent({
        intent: "enable facial recognition",
        slots: [{ name: "Facial", type: facialRecogntionSlotType }],
        utterances: ["enable {Facial}", "turn on {Facial}", "start {Facial}"],
        callback: () => facialRecogntion.enable()
    });

    nlc.registerIntent({
        intent: "disable facial recognition",
        slots: [{ name: "Facial", type: facialRecogntionSlotType }],
        utterances: ["disable {Facial}", "turn off {Facial}", "stop {Facial}"],
        callback: () => facialRecogntion.disable()
    });

    nlc.registerIntent({
        intent: "say",
        slots: [{ name: "Something", type: "STRING" }],
        utterances: ["say {Something}", "talk {Something}", "speak {Something}"],
        callback: (something: string) => textToSpeech.say(something)
    });

    nlc.registerIntent({
        intent: "say",
        utterances: ["who is the fairest of them all"],
        callback: (something: string) => textToSpeech.say("everyone knows that olivia is the fairest of them all")
    });

    nlc.registerIntent({
        intent: "capture profile picture",
        slots: [{ name: "Capture", type: saveCaptureTakeSlotType }],
        utterances: ["{Capture} my profile picture", "{Capture} my profile", "{Capture} profile picture"],
        callback: () => () => facialRecogntion.saveProfilePicture(toJS(profiles.profile)+"")
    });

    nlc.registerIntent({
        intent: "capture profile picture for..",
        slots: [
            { name: "Capture", type: saveCaptureTakeSlotType },
            { name: "Person", type: "STRING" },
        ],
        utterances: ["{Capture} profile picture for {Person}", "{Capture} profile for {Person}"],
        callback: () => (person: string) => facialRecogntion.saveProfilePicture(person)
    });
}