import * as React from 'react';
import ProfilePicture from '../plugins/profile-picture/ProfilePicture';
import TimeUntilProfileChangeBar from '../plugins/facial-recognition/TimeUntilProfileChangeBar';

interface Props {
}

const ProfilePicWithChangeBar : React.SFC<Props> = (props) => 
    <div>
        <ProfilePicture url="mike"  />
        <TimeUntilProfileChangeBar />
    </div>

export = ProfilePicWithChangeBar;