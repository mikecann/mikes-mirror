import { Container } from "unstated";
import { Profiles } from '../components/Profiles';
import { wrap } from '../utils/utils';

export interface State {
  profile: string,
  facialRecognitionEnabled?: boolean,
  profileLocked?: boolean
}

export class AppStore extends Container<State> {

  constructor(props: State, private profiles: Profiles) {
    super();
    this.state = props;
  }

  changeProfile = (profile: string, force?: boolean) => {

    if (this.state.profileLocked && !force) 
      return console.log(`Cannot change profile to '${profile}', it is currently locked`);

    if (!this.profiles.hasOwnProperty(profile))
      return console.log(`Cannot change profile to '${profile}', its an unknown profile`);

    if (profile === this.state.profile)
      return;
    
    this.setState({ profile });
    console.log(`Profile changed`, { profile });
  }

  nextProfile = () => {
    var keys = Object.keys(this.profiles);
    let nextIndex = wrap(0, keys.length, keys.indexOf(this.state.profile) + 1);
    console.log(`nextProfiled`, { nextIndex });
    this.changeProfile(keys[nextIndex]);
  }

  prevProfile = () => {
    var keys = Object.keys(this.profiles);
    let nextIndex = wrap(0, keys.length, keys.indexOf(this.state.profile) - 1);
    console.log(`prevProfile`, { nextIndex });
    this.changeProfile(keys[nextIndex]);
  }

  lockProfile = (profile: string) => {
    console.log("profile locked to", profile);
    this.changeProfile(profile);
    this.setState({ profileLocked: true });
  }

  unlockProfile = () => {
    console.log("unlocking profile");
    this.setState({ profileLocked: false });
  }
}