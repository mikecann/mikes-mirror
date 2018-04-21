import * as React from 'react';
// import './welcome-message.css';

interface Props {
    message: string
}

export default class WelcomeMessage extends React.Component<Props, any> {

    render() {
        return <div className="welcome-message">
            {this.props.message}
        </div>
    }
}