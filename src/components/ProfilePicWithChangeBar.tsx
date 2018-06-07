import * as React from 'react';
import ProfilePicture from '../widgets/profile-picture/ProfilePicture';
import TimeUntilProfileChangeBar from '../widgets/facial-recognition/TimeUntilProfileChangeBar';

interface Props {
}

const ProfilePicWithChangeBar : React.SFC<Props> = (props) => 
    <div>
        <ProfilePicture url="mike"  />
        <TimeUntilProfileChangeBar />
    </div>

export = ProfilePicWithChangeBar;