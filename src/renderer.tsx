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
import { FacialRecognitionStore } from './widgets/facial-profile-switcher/FaceDetectionStore';
import TarynsProfile from './profiles/TarynsProfile';
import LeahsProfile from './profiles/LeahsProfile';
import UnknownProfile from './profiles/UnknownProfile';
import OliviasProfile from './profiles/OliviasProfile';
import GregsProfile from './profiles/GregsProfile';
import ColleensProfile from './profiles/ColleensProfile';
import { VoiceCommandsStore } from './widgets/voice-commands/VoiceCommandsStore';

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

const facialRecognition = new FacialRecognitionStore();
const systemInfo = new SystemInformationStore();
const voiceCommands = new VoiceCommandsStore();

// Begin rendering
ReactDOM.render(
  <Provider inject={[facialRecognition, systemInfo, voiceCommands]}>
    <App 
      isProd={process.env.NODE_ENV=="production"}
      profiles={profiles}  
      startingProfile="empty"
    />
  </Provider>,
  document.getElementById('root') as HTMLElement
);