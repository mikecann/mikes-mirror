import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MikesProfile from './profiles/MikesProfile';
import KelsiesProfile from './profiles/KelsiesProfile';
import EmptyProfile from './profiles/EmptyProfile';
import { Profiles } from './components/Profiles';
import { FacialRecognitionStore } from './stores/FaceRecognitionStore';
import { Provider } from "unstated";
import App from './components/App';
import { setupStyles } from './styles';

// Setup the initial styles for the page
setupStyles();

// The available profiles we can switch between
const profiles: Profiles = {
  mike: (app: App) => <MikesProfile app={app} />,
  kelsie: (app: App) => <KelsiesProfile app={app} />,
  empty: (app: App) => <EmptyProfile app={app} />
}

const facialRecognition = new FacialRecognitionStore();

// Begin rendering
ReactDOM.render(
  <Provider inject={[facialRecognition]}>
    <App 
      profiles={profiles}  
      startingProfile="mike"
    />
  </Provider>,
  document.getElementById('root') as HTMLElement
);