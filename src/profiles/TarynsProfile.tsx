import * as React from 'react';
import Clock from '../widgets/clock/Clock';
import WelcomeMessage from '../widgets/welcome-message/WelcomeMessage';
import ProfilePicture from '../widgets/profile-picture/ProfilePicture';
import NewsRSS from '../widgets/news-rss/NewsRSS';
import App from '../components/App';
import css from "./styles";
import { Howl } from "howler";

interface Props {
  app: App
}

export default class TarynsProfile extends React.Component<Props, any> {


  componentDidMount() {
    new Howl({ src: [ "./scream.wav" ] })
      .play();
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