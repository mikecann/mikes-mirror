import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { FacialProfileSwitcher } from './FacialProfileSwitcher';

interface Props {
    facialSwitcher?: FacialProfileSwitcher
}

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

        return <div style={{ width: "100%" }}>
            <div style={{ background: "white", width: percent + "%", height: 10,
                borderRadius: 4 }} />
        </div>
    }
}