import * as React from 'react';
import WelcomeMessage from '../widgets/welcome-message/WelcomeMessage';
import App from '../components/App';
import css from "./styles";
import SystemInfo from '../widgets/system-info/SystemInfo';
import DisplayDeactivator from '../widgets/display-deactivator/DisplayDeactivator';

interface Props {
  app: App
}

export default class EmptyProfile extends React.Component<Props, any> {
  render() {
    return <div className={css.rootContainer}>
      <div className={css.flex} />
      <div className={css.hozContainer}>
        <div className={css.flex} />
        <div style={{ textAlign: "center" }}>
          <WelcomeMessage message="No one there" />        
          <DisplayDeactivator msBeforeTurnOff={10000} />
        </div>
        <div className={css.flex} />
      </div>
      <div className={css.flex} />
      <SystemInfo />
      
    </div>
  }
}