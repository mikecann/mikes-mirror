import * as React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { Profiles } from './Profiles';
import ProfileWrapper from './ProfileWrapper';
import ManualProfileSwitcher from '../widgets/manual-profile-switcher/ManualProfileSwitcher';
import css from "./AppStyles";
import VoiceCommands from '../widgets/voice-commands/VoiceCommands';
import { VoiceCommandsStore } from '../widgets/voice-commands/VoiceCommandsStore';
import { Subscribe } from 'unstated';
import { AppStore } from '../stores/AppStore';
import FacialRecognition from '../widgets/facial-recognition/FacialRecognition';
import FacialProfileSwitcher from '../widgets/facial-recognition/FacialProfileSwitcher';

interface Props {
  profiles: Profiles,
  startingProfile: string,
  isProd: boolean
}

export default class App extends React.Component<Props, any> {

  render() {
    return <Subscribe to={[VoiceCommandsStore, AppStore]}>
      {
        (voiceStore: VoiceCommandsStore, appStore: AppStore) => 
          this.renderAll(appStore, voiceStore)
      }
    </Subscribe>
  }

  renderAll(appStore: AppStore, voiceStore: VoiceCommandsStore) {

    const { profiles } = this.props;
    const { profile } = appStore.state;

    const voiceState = voiceStore.state.state;
    const shouldShowProfile = voiceState == "ready" || voiceState == "not-ready";

    return <div className={css.app}>

      {shouldShowProfile ?
        <CSSTransitionGroup
          className={css.profiles}
          transitionName="profile"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {[<ProfileWrapper key={profile}>
            {profiles[profile]()}
          </ProfileWrapper>]}
        </CSSTransitionGroup> : null
      }

      <ManualProfileSwitcher
        onChangeProfile={appStore.changeProfile}
        onNextProfile={appStore.nextProfile}
        onPrevProfile={appStore.prevProfile}
      />

      {this.props.isProd ? <FacialProfileSwitcher onChangeProfile={appStore.changeProfile} /> : null}

      <VoiceCommands />
      <FacialRecognition />

    </div>
  }
}