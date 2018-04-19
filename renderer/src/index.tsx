import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import MikesProfile from './profiles/MikesProfile';
import KelsiesProfile from './profiles/KelsiesProfile';
import EmptyProfile from './profiles/EmptyProfile';
import { Profiles } from './components/Profiles';
import { FacialRecognitionStore } from './stores/FaceRecognitionStore';
import { Provider } from "unstated";
import ScottysProfile from './profiles/ScottysProfile';

const profiles: Profiles = {
  mike: (app: App) => <MikesProfile app={app} />,
  kelsie: (app: App) => <KelsiesProfile app={app} />,
  empty: (app: App) => <EmptyProfile app={app} />,
  scotty: (app: App) => <ScottysProfile app={app} />
}

const facialRecognition = new FacialRecognitionStore();

ReactDOM.render(
  <Provider inject={[facialRecognition]}>
    <App 
      profiles={profiles}  
      startingProfile="mike"
    />
  </Provider>,
  document.getElementById('root') as HTMLElement
);