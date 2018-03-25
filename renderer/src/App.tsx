import * as React from 'react';
import './app.css';
import Clock from './widgets/clock/Clock';
import Particles from './widgets/particles/Particles';
import FaceDetect from './widgets/face-detect/FaceDetect';

// const electron = (window as any).require('electron');
// const fs = electron.remote.require('fs');
// const ipcRenderer  = electron.ipcRenderer;
// console.log({fs, ipcRenderer});

export default class App extends React.Component {
  render() {
    return <div>
      <Particles />
      <Clock />    
      <FaceDetect />  
    </div>
  }
}