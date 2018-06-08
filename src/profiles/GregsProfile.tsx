import * as React from 'react';
import Clock from '../plugins/clock/Clock';
import WelcomeMessage from '../plugins/welcome-message/WelcomeMessage';
import css from "./styles";
import { Profile } from '../plugins/profiles/Profile';
import { ProfilePicWithChangeBar } from '../components/ProfilePicWithChangeBar';


export default class GregsProfile extends Profile<any, any> {

  componentDidMount() {
    // Play a sound when showing the profile
    // new Howl({ src: ["./yodelayheehaw.wav"] }).play();
  }

  render() {

    return <div className={css.profile}>

      <div className={css.rootContainer}>

        <div className={css.hozContainer}>
          <Clock />
          <div className={css.flex} />
          <ProfilePicWithChangeBar url="../facial_recognition/faces/greg.jpg" />
        </div>

        <div className={css.flex} />

        <div className={css.hozContainer}>
          <div className={css.flex} />
          <WelcomeMessage message="Gone Fishin" />
          <div className={css.flex} />
        </div>

      </div>

    </div>
  }

}