import * as React from 'react';
import WelcomeMessage from '../widgets/welcome-message/WelcomeMessage';
import css from "./styles";
import SystemInfo from '../widgets/system-info/SystemInfo';
import DisplayDeactivator from '../widgets/display-deactivator/DisplayDeactivator';
import Clock from '../widgets/clock/Clock';
import FacialRecogntionStats from '../widgets/facial-recognition/FacialRecogntionStats';
import { Profile } from '../widgets/profiles/Profile';

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