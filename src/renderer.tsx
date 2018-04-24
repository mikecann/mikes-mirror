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

// Setup the initial styles for the page
setupStyles();

// The available profiles we can switch between
const profiles: Profiles = {
  mike: (app: App) => <MikesProfile app={app} />,
  kelsie: (app: App) => <KelsiesProfile app={app} />,
  taryn: (app: App) => <TarynsProfile app={app} />,
  leah: (app: App) => <LeahsProfile app={app} />,
  empty: (app: App) => <EmptyProfile app={app} />
}

const facialRecognition = new FacialRecognitionStore();
const systemInfo = new SystemInformationStore();

// Begin rendering
ReactDOM.render(
  <Provider inject={[facialRecognition, systemInfo]}>
    <App 
      isProd={process.env.NODE_ENV=="production"}
      profiles={profiles}  
      startingProfile="mike"
    />
  </Provider>,
  document.getElementById('root') as HTMLElement
);