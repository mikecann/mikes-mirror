import * as React from 'react';
// import './empty-profile.css';
import App from '../App';
import WelcomeMessage from '../widgets/welcome-message/WelcomeMessage';

interface Props {
  app: App
}

export default class EmptyProfile extends React.Component<Props, any> {
  render() {
    return <div className="empty-profile">
      <WelcomeMessage message="No one there" />
    </div>
  }
}