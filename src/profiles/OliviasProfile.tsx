import * as React from 'react';
import Clock from '../plugins/clock/Clock';
import WelcomeMessage from '../plugins/welcome-message/WelcomeMessage';
import css from "./styles";
import { Howl } from "howler";
import RandomCute from '../plugins/random-cute/RandomCute';
import { Profile } from '../plugins/profiles/Profile';
import { ProfilePicWithChangeBar } from '../components/ProfilePicWithChangeBar';


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
          <ProfilePicWithChangeBar url="../facial_recognition/faces/olivia.jpg" />
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