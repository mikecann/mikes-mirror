import * as React from 'react';
import css from "./styles";
import { VoiceCommandsModel } from './VoiceCommandsModel';
import { observer } from "mobx-react";

interface Props {
    model: VoiceCommandsModel
}

@observer
export default class VoiceCommands extends React.Component<Props, any> {

    render() {

        const lastEvent = this.props.model.lastEvent;

        return <div className="voice-command">
        <div className={css.full}>

            <div className={css.flex} />

            <div className={css.hozContainer}>
                <div className={css.flex} />
                event: {lastEvent ? lastEvent.event : null}
                <div className={css.flex} />
            </div>

            <div className={css.flex} />

        </div>

    </div>
    }
}