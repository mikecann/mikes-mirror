import * as React from 'react';
import './mikes-profile.css';
import Particles from '../widgets/particles/Particles';
import Clock from '../widgets/clock/Clock';
import App from '../App';
import WelcomeMessage from '../widgets/welcome-message/WelcomeMessage';

interface Props {
  app: App
}

export default class MikesProfile extends React.Component<Props, any> {
  render() {
    return <div className="mikes-profile">
      <Particles />
      <Clock />    
      <WelcomeMessage message="Hi Mike" />
      {/* <FaceDetect />   */}
    </div>
  }
}