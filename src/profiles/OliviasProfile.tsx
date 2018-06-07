import * as React from 'react';
import Clock from '../widgets/clock/Clock';
import WelcomeMessage from '../widgets/welcome-message/WelcomeMessage';
import ProfilePicture from '../widgets/profile-picture/ProfilePicture';
import css from "./styles";
import { Howl } from "howler";
import RandomCute from '../widgets/random-cute/RandomCute';
import { Profile } from '../widgets/profiles/Profile';


export default class OliviasProfile extends Profile<any, any> {


  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  async componentDidMount() {
    // Play a sound when showing the profile
    new Howl({ src: ["./matchbox.wav"] }).play();
  }

  render() {
    
    return <div className={css.profile}>

      <div className={css.rootContainer}>

        <div className={css.hozContainer}>
          <Clock />
          <div className={css.flex} />
          <ProfilePicture url="../facial_recognition/faces/olivia.jpg" />
        </div>

        <div className={css.flex} />
        <div className={css.hozContainer}>
          <div className={css.flex} />
          <RandomCute />
          <div className={css.flex} />
        </div>
        <div className={css.flex} />

        <div className={css.hozContainer}>
          
          <div className={css.flex} />
          <WelcomeMessage message="Streichholzschachtel" />
          <div className={css.flex} />
        </div>

      </div>

    </div>
  }

}