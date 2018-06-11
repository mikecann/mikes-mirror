import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { FacialProfileSwitcher } from './FacialProfileSwitcher';
import { ProfilesStore } from '../profiles/ProfilesStore';

interface Props {
    facialSwitcher?: FacialProfileSwitcher,
    profiles?: ProfilesStore<any>
}

@inject("profiles")
@inject("facialSwitcher")
@observer
export default class TimeUntilProfileSwitchBar extends React.Component<Props, any> {

    private interval: NodeJS.Timer;

    componentDidMount() {
        this.interval = setInterval(() => this.forceUpdate(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        var remain = this.props.facialSwitcher!.timeOfNextSwitch - Date.now();
        remain = Math.max(0, remain);

        var ratio = remain / this.props.facialSwitcher!.minDelayBetweenSwitchesMs;
        var percent = Math.round(ratio * 100);

        const isLocked = this.props.profiles!.isProfileLocked;

        return <div style={{ width: "100%" }}>
            {isLocked ? <Locked /> : <NotLocked percent={percent} />}
        </div>
    }
}

const NotLocked = (props: { percent: number }) =>
    <div style={{
        background: "white", width: props.percent + "%", height: 10,
        borderRadius: 4
    }} />

const Locked = () =>
    <div style={{
        background: "rgba(255,255,255,0.2)", textAlign: "center", width: "100%", height: 20,
        borderRadius: 4
    }}><i className="fa fa-lock" /></div>
