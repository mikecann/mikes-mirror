import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { ProfilesStore } from './ProfilesStore';

interface Props {
    profiles?: ProfilesStore<any>
}

@inject("profiles")
@observer
export default class ManualProfileSwitcher extends React.Component<Props, any> {

    componentDidMount() {
        document.addEventListener("keyup", this.onKeyUp);
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.onKeyUp);
    }

    onKeyUp = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft")
            this.props.profiles!.prevProfile();
        else if (e.key === "ArrowRight")
            this.props.profiles!.nextProfile();
    }

    render() {
        return <div />
    }
}