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

interface Props {
  profiles?: ProfilesStore<AppProfiles>
}

@inject("profiles")
@observer
export default class App extends React.Component<Props, any> {

  render() {

    const { profiles } = this.props;
    const profile = profiles!.profile;

    return <div className={css.app}>

      <CSSTransitionGroup
        className={css.profiles}
        transitionName="profile"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {[<ProfileWrapper key={profile}>
          {profiles!.profiles[profile]()}
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