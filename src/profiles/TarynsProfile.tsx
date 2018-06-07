import * as React from 'react';
import Clock from '../widgets/clock/Clock';
import WelcomeMessage from '../widgets/welcome-message/WelcomeMessage';
import ProfilePicture from '../widgets/profile-picture/ProfilePicture';
import css from "./styles";
import { Howl } from "howler";
import { Profile } from '../widgets/profiles/Profile';

export default class TarynsProfile extends Profile<any, any> {

  componentDidMount() {
    // Play a sound when showing the profile
    new Howl({ src: [ "./scream.wav" ] }).play();
  }

  render() {

    return <div className={css.profile}>

      <div className={css.rootContainer}>

        <div className={css.hozContainer}>
          <Clock />
          <div className={css.flex} />
          <ProfilePicture url="../facial_recognition/faces/taryn.jpg" />
        </div>
      
        <div className={css.flex} />

        <div className={css.hozContainer}>
          <div className={css.flex} />
          <WelcomeMessage message="Oh jeez.." />
          <div className={css.flex} />
        </div>

      </div>

    </div>

  }
}