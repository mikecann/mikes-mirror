import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MikesProfile from './profiles/MikesProfile';
import KelsiesProfile from './profiles/KelsiesProfile';
import EmptyProfile from './profiles/EmptyProfile';
import { Profiles } from './components/Profiles';
import { Provider } from "unstated";
import App from './components/App';
import { setupStyles } from './styles';
import { SystemInformationStore } from './widgets/system-info/SystemInformationStore';
import TarynsProfile from './profiles/TarynsProfile';
import LeahsProfile from './profiles/LeahsProfile';
import UnknownProfile from './profiles/UnknownProfile';
import OliviasProfile from './profiles/OliviasProfile';
import GregsProfile from './profiles/GregsProfile';
import ColleensProfile from './profiles/ColleensProfile';
import { VoiceCommandsStore } from './widgets/voice-commands/VoiceCommandsStore';
import { AppStore } from './stores/AppStore';
import { VoiceCommandsService } from './services/VoiceCommandsService';
import { FacialRecognitionStore } from './widgets/facial-recognition/FacialRecognitionStore';
import { TextToSpeechService } from './services/TextToSpeechService';

// Setup the initial styles for the page
setupStyles();

// The available profiles we can switch between
const profiles: Profiles = {
  mike: () => <MikesProfile />,
  kelsie: () => <KelsiesProfile />,
  taryn: () => <TarynsProfile />,
  olivia: () => <OliviasProfile />,
  greg: () => <GregsProfile />,
  colleen: () => <ColleensProfile />,
  leah: () => <LeahsProfile />,
  empty: () => <EmptyProfile />,
  unknown: () => <UnknownProfile />
}

const appStore = new AppStore({
  profile: "empty"
}, profiles);

const facialRecognition = new FacialRecognitionStore({
  autoRestart: true
});

const systemInfo = new SystemInformationStore();
const textToSpeech = new TextToSpeechService();
const commandsService = new VoiceCommandsService(appStore, facialRecognition);
const voiceCommands = new VoiceCommandsStore(commandsService.createCommands(), {
  autoRestart: true
});

textToSpeech.init();
//textToSpeech.say("Hello there mike");

setTimeout(() => facialRecognition.enable(), 3000);

// Begin rendering
ReactDOM.render(
  <Provider inject={[facialRecognition, systemInfo, voiceCommands, appStore]}>
    <App 
      isProd={process.env.NODE_ENV=="production"}
      profiles={profiles}  
      startingProfile="empty"
    />
  </Provider>,
  document.getElementById('root') as HTMLElement
);