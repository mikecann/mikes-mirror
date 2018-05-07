import * as React from 'react';
import Clock from '../widgets/clock/Clock';
import WelcomeMessage from '../widgets/welcome-message/WelcomeMessage';
import ProfilePicture from '../widgets/profile-picture/ProfilePicture';
import NewsRSS from '../widgets/news-rss/NewsRSS';
import css from "./styles";
//import { Howl } from "howler";
import RandomCute from '../widgets/random-cute/RandomCute';

export default class MikesProfile extends React.Component<any, any> {


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
          <ProfilePicture url="../facial_recognition/faces/kelsie.jpg" />
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