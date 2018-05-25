import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MikesProfile from './profiles/MikesProfile';
import KelsiesProfile from './profiles/KelsiesProfile';
import EmptyProfile from './profiles/EmptyProfile';
import { Profiles } from './components/Profiles';
import App from './components/App';
import { setupStyles } from './styles';
import LeahsProfile from './profiles/LeahsProfile';
import UnknownProfile from './profiles/UnknownProfile';
import OliviasProfile from './profiles/OliviasProfile';
import GregsProfile from './profiles/GregsProfile';
import ColleensProfile from './profiles/ColleensProfile';
import TarynsProfile from './profiles/TarynsProfile';
import { FacialRecognitionModel } from './widgets/facial-profile-switcher/FaceDetectionModel';
import { VoiceCommandsModel } from './widgets/voice-commands/VoiceCommandsModel';
import { Provider } from 'mobx-react';
import { SystemInformationModel } from './widgets/system-info/SystemInformationModel';

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

const facialRecognition = new FacialRecognitionModel();
const voiceCommands = new VoiceCommandsModel();
const systemInfoModel = new SystemInformationModel();

// Begin rendering
ReactDOM.render(
  <Provider systemInfoModel={systemInfoModel}>
    <App 
      facialModel={facialRecognition}
      voiceModel={voiceCommands}
      isProd={process.env.NODE_ENV=="production"}
      profiles={profiles}  
      startingProfile="empty"
    />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

// Init the models
facialRecognition.startDetecting();
voiceCommands.startDetecting();
systemInfoModel.start();