import * as React from 'react';
import './scottys-profile.css';
import App from '../App';
import WelcomeMessage from '../widgets/welcome-message/WelcomeMessage';
import Clock from '../widgets/clock/Clock';

interface Props {
  app: App
}

export default class ScottysProfile extends React.Component<Props, any> {
  render() {
    return <div className="empty-profile">
      <Clock />
      <WelcomeMessage message="Ello Scotty!" />
    </div>
  }
}