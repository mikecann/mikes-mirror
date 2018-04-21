import * as React from 'react';
import { stylesheet } from 'typestyle/lib';

const css = stylesheet({
    profileWrapper: {
        position: "absolute",
        width: "100%",
        height: "100%"
    }
})

export default class ProfileWrapper extends React.Component<any, any> {
    render() {
        return <div className={css.profileWrapper}>
            {this.props.children}
        </div>
    }
}