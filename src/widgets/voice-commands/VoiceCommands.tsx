import * as React from 'react';
import css from "./styles";
import { Subscribe } from "unstated";
import { VoiceCommandsStore, State } from './VoiceCommandsStore';

interface Props {

}

export default class VoiceCommands extends React.Component<Props, any> {

    render() {

        return <Subscribe to={[VoiceCommandsStore]}>
            {
                (store: VoiceCommandsStore) => <div className={css.voiceCommands}>
                    <EventRendering state={store.state} />
                </div>
            }
        </Subscribe>
    }
}

const EventRendering = (props: { state: State }) => {

    const { state, result } = props.state;

    if (state == "not-ready")
        return <NotReady />

    if (state == "ready")
        return <Ready />

    if (state == "hotword-detected")
        return <HotwordDetected />

    if (state == "partial")
        return <Partial result={result!} />

    if (state == "final" || state == "command-found" || state == "command-not-found")
        return <Final result={result!} />

    if (state == "error")
        return <Error result={result!} />

    return <Unknown {...props.state} />
}

const NotReady = () =>
    <div className={css.ready}>
        <span className="fa fa-microphone" style={{ color: "white", opacity: 0.5 }} />
    </div>

const Ready = () =>
    <div className={css.ready}>
        <span className="fa fa-microphone" />
    </div>

const HotwordDetected = () =>
    <div className={css.rootContainer}>
        <span className="fa fa-microphone" style={{ color: "white" }} />
    </div>

const Partial = ({ result }: { result: string }) =>
    <div className={css.rootContainer}>
        <div><i className="fa fa-microphone" style={{ color: "orange" }} /></div>
        <div>{result}</div>
    </div>

const Final = ({ result }: { result: string }) =>
    <div className={css.rootContainer}>
        <div><i className="fa fa-microphone" style={{ color: "green" }} /></div>
        <div>{result}</div>
    </div>

const Error = ({ result }: { result: string }) =>
    <div className={css.rootContainer}>
        <div><i className="fa fa-microphone" style={{ color: "red" }} /></div>
        <div>ERROR {result}</div>
    </div>

const Unknown = (props: any) =>
    <div className={css.rootContainer}>
        <div><i className="fa fa-microphone" style={{ color: "green" }} /></div>
        <div>UNKOWN {JSON.stringify(event)}</div>
    </div>