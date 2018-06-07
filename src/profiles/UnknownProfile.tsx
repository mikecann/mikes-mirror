import * as React from 'react';
import WelcomeMessage from '../widgets/welcome-message/WelcomeMessage';
import css from "./styles";
import SystemInfo from '../widgets/system-info/SystemInfo';
import { Profile } from '../widgets/profiles/Profile';

export default class UnknownProfile extends Profile<any, any> {
  render() {
    return <div className={css.rootContainer}>
      <div className={css.flex} />
      <div className={css.hozContainer}>
        <div className={css.flex} />
        <div style={{ textAlign: "center" }}>
          <i className="fa fa-unknown" style={{ fontSize: "8em" }} />
          <WelcomeMessage message="I have no idea who you are.." />        
        </div>
        <div className={css.flex} />
      </div>
      <div className={css.flex} />
      <SystemInfo />
    </div>
  }
}