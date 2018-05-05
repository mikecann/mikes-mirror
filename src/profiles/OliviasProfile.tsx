import * as React from 'react';
import Clock from '../widgets/clock/Clock';
import WelcomeMessage from '../widgets/welcome-message/WelcomeMessage';
import ProfilePicture from '../widgets/profile-picture/ProfilePicture';
import css from "./styles";
import { Howl } from "howler";

interface State 
{
  puppies: string[]
}

export default class OliviasProfile extends React.Component<any, State> {


  constructor(props: any) {
    super(props);
    this.state = {
      puppies: ["nF79jOW"]
    }
  }

  async componentDidMount() {
    // Play a sound when showing the profile
    new Howl({ src: ["./matchbox.wav"] }).play();

    var puppiesResp = await fetch("https://raw.githubusercontent.com/heyitsolivia/secretpuppies/master/puppies.json");
    var puppiesJson = await puppiesResp.json();
    this.setState({ puppies: puppiesJson });

  }

  render() {
    
    const puppyId = this.state.puppies[Math.floor(Math.random()*this.state.puppies.length)];
    const puppy = `https://i.imgur.com/${puppyId}.mp4`;

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
          <video src={puppy} autoPlay loop />
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