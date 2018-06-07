import { Container } from "unstated";
import { Profiles } from '../components/Profiles';
import { wrap } from '../utils/utils';

export interface State {
  profile: string,
  facialRecognitionEnabled?: boolean,
  profileLocked?: boolean,
  timeProfileChanged: number,
  msBetweenProfileChanges: number
}

export class AppStore extends Container<State> {

  constructor(props: Partial<State>, private profiles: Profiles) {
    super();
    this.state = {
      ...props as any,
      timeProfileChanged: Date.now()
    }
  }

  changeProfile = (profile: string, force?: boolean) => {

    // if (this.state.profileLocked && !force) 
    //   return console.log(`Cannot change profile to '${profile}', it is currently locked`);

    if (!this.profiles.hasOwnProperty(profile))
      return console.log(`Cannot change profile to '${profile}', its an unknown profile`);

    if (profile === this.state.profile)
      return;
    
    this.setState({ profile, timeProfileChanged: Date.now() });
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

  isTimeToChangeProfile() {
    return Date.now() - this.state.timeProfileChanged! >= this.state.msBetweenProfileChanges;
  }

  msRemainingBeforeChange() {
    return this.state.msBetweenProfileChanges - (Date.now() - this.state.timeProfileChanged);
  }
}