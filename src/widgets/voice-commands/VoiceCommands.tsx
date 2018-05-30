import * as React from 'react';
import css from "./styles";
import { Subscribe } from "unstated";
import { VoiceCommandsStore, VoiceEvent } from './VoiceCommandsStore';

interface Props {

}

export default class VoiceCommands extends React.Component<Props, any> {

    render() {

        return <Subscribe to={[VoiceCommandsStore]}>
            {
                (store: VoiceCommandsStore) => <div className={css.voiceCommands}>
                    <EventRendering event={store.state.event} />
                </div>
            }
        </Subscribe>
    }
}

const EventRendering = ({ event }: { event: VoiceEvent }) => {

    if (event.event == "not-ready")
        return <NotReady event={event} />

    if (event.event == "ready")
        return <Ready event={event} />

    if (event.event == "hotword-detected")
        return <HotwordDetected event={event} />

    if (event.event == "partial")
        return <Partial event={event} />

    if (event.event == "final")
        return <Final event={event} />

    if (event.event == "error")
        return <Error event={event} />

    return <Unknown event={event} />
}

const NotReady = ({ event }: { event: VoiceEvent }) =>
    <div className={css.ready}>
        <span className="fa fa-microphone" style={{ color: "white", opacity: 0.5 }} />
    </div>

const Ready = ({ event }: { event: VoiceEvent }) =>
    <div className={css.ready}>
        <span className="fa fa-microphone" />
    </div>

const HotwordDetected = ({ event }: { event: VoiceEvent }) =>
    <div className={css.rootContainer}>
        <span className="fa fa-microphone" style={{ color: "white" }} />
    </div>

const Partial = ({ event }: { event: VoiceEvent }) =>
    <div className={css.rootContainer}>
        <div><i className="fa fa-microphone" style={{ color: "orange" }} /></div>
        <div>{event.result}</div>
    </div>

const Final = ({ event }: { event: VoiceEvent }) =>
    <div className={css.rootContainer}>
        <div><i className="fa fa-microphone" style={{ color: "green" }} /></div>
        <div>{event.result}</div>
    </div>

const Error = ({ event }: { event: VoiceEvent }) =>
    <div className={css.rootContainer}>
        <div><i className="fa fa-microphone" style={{ color: "red" }} /></div>
        <div>ERROR {JSON.stringify(event.result)}</div>
    </div>

const Unknown = ({ event }: { event: VoiceEvent }) =>
    <div className={css.rootContainer}>
        <div><i className="fa fa-microphone" style={{ color: "green" }} /></div>
        <div>UNKOWN {JSON.stringify(event)}</div>
    </div>