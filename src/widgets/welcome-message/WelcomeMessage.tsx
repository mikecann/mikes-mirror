import * as React from 'react';
import css from "./styles";

interface Props {
    message: string
}

export default class WelcomeMessage extends React.Component<Props, any> {

    render() {
        return <div className={css.message}>
            {this.props.message}
        </div>
    }
}