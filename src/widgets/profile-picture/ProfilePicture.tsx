import * as React from 'react';
import css from "./styles";

interface Props {
    url: string
}

export default class ProfilePicture extends React.Component<Props, any> {

    render() {
        const { url } = this.props;
        return <div className={css.container}>
            <img className={css.img} src={url} />
        </div>
    }
}