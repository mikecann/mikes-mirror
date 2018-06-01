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
      return;

    if (!this.profiles.hasOwnProperty(profile))
      return console.log(`Cannot change profile to '${profile}', its an unknown profile`);

    if (profile === this.state.profile)
      return;

    console.log(`Profile changed`, { profile });
    this.setState({ profile });
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

  lockProfile = (profle: string) => {
    this.changeProfile(profle);
    this.setState({ profileLocked: true });
  }

  unlockProfile = () => this.setState({ profileLocked: false });
}