import * as React from 'react';
import './kelsies-profile.css';
import Clock from '../widgets/clock/Clock';
import App from '../App';
import WelcomeMessage from '../widgets/welcome-message/WelcomeMessage';

interface Props {
  app: App
}

export default class MikesProfile extends React.Component<Props, any> {
  render() {

    return <div className="kelsies-profile">
      <Clock />          
      <WelcomeMessage message="Hey there beautiful" />
      {/* <FaceDetect />   */}
    </div>
  }
}