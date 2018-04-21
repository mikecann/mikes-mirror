import * as React from 'react';
import WelcomeMessage from '../widgets/welcome-message/WelcomeMessage';
import App from '../components/App';

interface Props {
  app: App
}

export default class EmptyProfile extends React.Component<Props, any> {
  render() {
    return <div>
      <WelcomeMessage message="No one there" />
    </div>
  }
}