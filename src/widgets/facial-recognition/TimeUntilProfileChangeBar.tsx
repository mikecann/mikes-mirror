import * as React from 'react';
import { Subscribe } from "unstated";
import { AppStore } from '../../stores/AppStore';

interface Props {
}

export default class TimeUntilProfileChangeBar extends React.Component<Props, any> {

    render() {

        return <Subscribe to={[AppStore]}>
            {
                (store: AppStore) =>  <div>
                    { this.renderStats(store) }
                </div>
            }
        </Subscribe>
    }

    renderStats(store: AppStore) {

        var timeRemaining = store.msRemainingBeforeChange(); 

        return <span style={{ fontSize: "0.8em" }}>
            { timeRemaining }
        </span>
    }
}