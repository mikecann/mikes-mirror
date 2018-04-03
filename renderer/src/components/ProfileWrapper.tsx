import * as React from 'react';
import './profile-wrapper.css';

interface Props {
}

export default class ProfileWrapper extends React.Component<Props, any> {
    render() {
        return <div className="profile-wrapper">
            {this.props.children}
        </div>
    }
}