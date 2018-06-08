import * as React from 'react';
import ProfilePicture from '../plugins/profile-picture/ProfilePicture';
import TimeUntilProfileSwitchBar from '../plugins/facial-profile-switcher/TimeUntilProfileChangeBar';

interface Props {
    url: string
}

export const ProfilePicWithChangeBar : React.SFC<Props> = (props) => 
    <div>
        <ProfilePicture url={props.url}  />
        <TimeUntilProfileSwitchBar />
    </div>