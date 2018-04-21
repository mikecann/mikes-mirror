import * as React from 'react';
// import './profile-picture.css';

interface Props {
    url: string
}

export default class ProfilePicture extends React.Component<Props, any> {

    render() {
        const { url } = this.props;
        return <div className="profile-picture">
            <img src={url} />
        </div>
    }
}