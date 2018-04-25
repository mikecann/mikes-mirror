import * as React from 'react';
import WelcomeMessage from '../widgets/welcome-message/WelcomeMessage';
import css from "./styles";
import SystemInfo from '../widgets/system-info/SystemInfo';

export default class UnknownProfile extends React.Component<any, any> {
  render() {
    return <div className={css.rootContainer}>
      <div className={css.flex} />
      <div className={css.hozContainer}>
        <div className={css.flex} />
        <div style={{ textAlign: "center" }}>
          <WelcomeMessage message="I have no idea who you are.." />        
        </div>
        <div className={css.flex} />
      </div>
      <div className={css.flex} />
      <SystemInfo />
      
    </div>
  }
}