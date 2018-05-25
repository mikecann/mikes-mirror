import * as React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { Profiles } from './Profiles';
import ProfileWrapper from './ProfileWrapper';
import ManualProfileSwitcher from '../widgets/manual-profile-switcher/ManualProfileSwitcher';
import FacialProfileSwitcher from '../widgets/facial-profile-switcher/FacialProfileSwitcher';
import { wrap } from '../utils/utils';
import css from "./AppStyles";
import VoiceCommands from '../widgets/voice-commands/VoiceCommands';

interface Props {
  profiles: Profiles,
  startingProfile: string,
  isProd: boolean
}

interface State {
  profile: string
}

export default class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      profile: props.startingProfile
    }
  }

  render() {
    const {profiles} = this.props;
    const {profile} = this.state;

    return <div className={css.app}>

        <CSSTransitionGroup
          className={css.profiles}
          transitionName="profile"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {[<ProfileWrapper key={profile}>
            {profiles[profile]()}
          </ProfileWrapper>]}
        </CSSTransitionGroup>

        <ManualProfileSwitcher 
          onChangeProfile={this.changeProfile} 
          onNextProfile={this.nextProfile} 
          onPrevProfile={this.prevProfile} 
        />

        { this.props.isProd ? <FacialProfileSwitcher onChangeProfile={this.changeProfile} /> : null } 

        <VoiceCommands />
    </div>
  }

  changeProfile = (profile: string) => {

    if (!this.props.profiles.hasOwnProperty(profile))
      return console.log(`Cannot change profile to '${profile}', its an unknown profile`);
    
    if (profile === this.state.profile)
      return;

    console.log(`Profile changed`, {profile});
    this.setState({profile});   
  }

  nextProfile = () => {
    var keys = Object.keys(this.props.profiles);
    let nextIndex = wrap(0, keys.length, keys.indexOf(this.state.profile) + 1);
    console.log(`nextProfiled`, {nextIndex});
    this.changeProfile(keys[nextIndex]);
  }

  prevProfile = () => {
    var keys = Object.keys(this.props.profiles);
    let nextIndex = wrap(0, keys.length, keys.indexOf(this.state.profile) - 1);
    console.log(`prevProfile`, {nextIndex});
    this.changeProfile(keys[nextIndex]);
  }

}