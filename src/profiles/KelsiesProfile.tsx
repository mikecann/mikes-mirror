import * as React from 'react';
import Clock from '../plugins/clock/Clock';
import WelcomeMessage from '../plugins/welcome-message/WelcomeMessage';
import css from "./styles";
import RandomCute from '../plugins/random-cute/RandomCute';
import { Profile } from '../plugins/profiles/Profile';
import { ProfilePicWithChangeBar } from '../components/ProfilePicWithChangeBar';

export default class KelsiesProfile extends Profile<any, any> {


  componentDidMount() {
    // Play a sound when showing the profile
    //new Howl({ src: [ "./angels.mp3" ] }).play();
  }

  render() {

    return <div className={css.profile}>

      <div className={css.rootContainer}>

        <div className={css.hozContainer}>
          <Clock />
          <div className={css.flex} />
          <ProfilePicWithChangeBar url="../facial_recognition/faces/kelsie.jpg" />
        </div>

        {/* <NewsRSS
          style={{ marginLeft: 20, maxWidth: "40em" }}
          title="Latest Health and Wellness News"
          feedUrl="http://www.health.com/mind-body/feed"
        /> */}

        <div className={css.flex} />

        <div className={css.hozContainer}>
          <div className={css.flex} />
          <RandomCute />
          <div className={css.flex} />
        </div>
        <div className={css.flex} />

        <div className={css.hozContainer}>
          <div className={css.flex} />
          <WelcomeMessage message="Hey there beautiful" />
          <div className={css.flex} />
        </div>

      </div>

    </div>

  }
}