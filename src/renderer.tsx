import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { setupStyles } from './styles';
import { SystemInformationStore } from './plugins/system-info/SystemInformationStore';
import { FacialRecognitionStore } from './plugins/facial-recognition/FacialRecognitionStore';
import { Provider as MobxProvider } from "mobx-react";
import { configure } from 'mobx';
import App from './components/App';
import { ProfilesStore } from './plugins/profiles/ProfilesStore';
import { appProfiles } from './profiles/AppProfiles';
import { SpeechDetectionStore } from './plugins/speech-detect/SpeechDetectionStore';
import { SpeechCommandsStore } from './plugins/speech-detect/SpeechCommandsStore';
import { VoiceCommandsController } from './services/VoiceCommandsService';
import { TextToSpeechService } from './services/TextToSpeechService';

// Setup the initial styles for the page
setupStyles();

// Init MobX
configure({
  enforceActions: true
})

// Services


// Controllers
//const facialSwitcher = new FacialProfileSwitchingController(appStore, facialStore);

// Construct dependencies
const profiles = new ProfilesStore(appProfiles, "empty");
const facialStore = new FacialRecognitionStore();
const systemInfo = new SystemInformationStore();
const speechDetection = new SpeechDetectionStore();
const textToSpeech = new TextToSpeechService();
const commandsService = new VoiceCommandsController(profiles, facialStore, textToSpeech);
const speechCommands = new SpeechCommandsStore(speechDetection, commandsService);





// Wait a little time for things to bootup before we start facial recognition
setTimeout(() => facialStore.enable(), 3000);

// Init
systemInfo.start();
speechDetection.start();
speechCommands.start();

// Begin rendering
ReactDOM.render(
  <MobxProvider
    systemInfo={systemInfo}
    profiles={profiles}
    facialStore={facialStore}
    speechDetection={speechDetection}
    speechCommands={speechCommands}
    >
      <App />
  </MobxProvider>,
  document.getElementById('root') as HTMLElement
);