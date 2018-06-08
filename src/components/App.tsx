import * as React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import ProfileWrapper from './ProfileWrapper';
import ManualProfileSwitcher from '../plugins/profiles/ManualProfileSwitcher';
import css from "./AppStyles";
import { observer, inject } from 'mobx-react';
import { ProfilesStore } from '../plugins/profiles/ProfilesStore';
import { AppProfiles } from '../profiles/AppProfiles';
import VoiceCommands from '../plugins/speech-detect/SpeechDetectionOverlay';
import FacialProfileStatusIcon from '../plugins/facial-recognition/FacialProfileStatusIcon';
import SpeechDetectionOverlay from '../plugins/speech-detect/SpeechDetectionOverlay';
import SpeechDetectionStatusIcon from '../plugins/speech-detect/SpeechDetectionStatusIcon';
import { toJS } from 'mobx';

interface Props {
  profiles?: ProfilesStore<AppProfiles>
}

@inject("profiles")
@observer
export default class App extends React.Component<Props, any> {

  render() {

    const profiles = toJS(this.props.profiles!.profiles);
    const profile = toJS(this.props.profiles!.profile) + "";
    
    const profileConstr = profiles[profile];

    console.log("profile", profile, profiles, profileConstr)

    return <div className={css.app}>

      <CSSTransitionGroup
        className={css.profiles}
        transitionName="profile"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {[<ProfileWrapper key={profile}>
          {profileConstr()}
        </ProfileWrapper>]}
      </CSSTransitionGroup>

      <ManualProfileSwitcher />

      <VoiceCommands />      
      <SpeechDetectionOverlay />

      <div style={{ display: "flex", position: "absolute", top: 0, right: 0 }}>
        <FacialProfileStatusIcon />
        <div style={{ width: 10 }} />
        <SpeechDetectionStatusIcon />
      </div>

    </div>
  }

}