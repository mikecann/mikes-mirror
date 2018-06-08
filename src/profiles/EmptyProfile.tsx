import * as React from 'react';
import WelcomeMessage from '../plugins/welcome-message/WelcomeMessage';
import css from "./styles";
import SystemInfo from '../plugins/system-info/SystemInfo';
import DisplayDeactivator from '../plugins/display-deactivator/DisplayDeactivator';
import Clock from '../plugins/clock/Clock';
import FacialRecogntionStats from '../plugins/facial-recognition/FacialRecogntionStats';
import { Profile } from '../plugins/profiles/Profile';

export default class EmptyProfile extends Profile<any, any> {
  render() {
    return <div className={css.rootContainer}>
      <div className={css.hozContainer}>
        <Clock />
        <div className={css.flex} />
      </div>
      <div className={css.flex} />
      <div className={css.hozContainer}>
        <div className={css.flex} />
        <div style={{ textAlign: "center" }}>
          <WelcomeMessage message="No one there" />        
          <DisplayDeactivator msBeforeTurnOff={60000 * 5} />
        </div>
        <div className={css.flex} />
      </div>
      <div className={css.flex} />
      <FacialRecogntionStats />
      <SystemInfo />
    </div>
  }
}