import * as React from 'react';
import css from "./styles";
import { observer, inject } from 'mobx-react';
import { SpeechDetectionStore } from './SpeechDetectionStore';
import { SpeechCommandsStore } from './SpeechCommandsStore';

interface Props {
    speechDetection?: SpeechDetectionStore;
    speechCommands?: SpeechCommandsStore;
}

@inject("speechDetection", "speechCommands")
@observer
export default class SpeechDetectionOverlay extends React.Component<Props, any> {

    render() {

        const { event, enabled, isRunning } = this.props.speechDetection!;
        const { command } = this.props.speechCommands!;

        if (!isRunning || !enabled)
            return "";

        if (!event || event.event == "not-ready")
            return "";

        if (event.event == "hotword-detected")
            return <HotwordDetected />

        if (event.event == "partial")
            return <Partial result={event.result!} />

        if (event.event == "final" && command)
            if (command.match)
                return <CommandFound result={event.result!} />
            else
                return <CommandNotFound result={event.result!} />

        if (event.event == "error")
            return <Error result={event.result!} />

        return "";
    }
}

const HotwordDetected = () =>
    <div className={css.fullscreen} >
        <div className={css.rootContainer}>
            <span className="fa fa-microphone" style={{ color: "white" }} />
        </div>
    </div>

const Partial = ({ result }: { result: string }) =>
    <div className={css.fullscreen} >
        <div className={css.rootContainer}>
            <div><i className="fa fa-microphone" style={{ color: "orange" }} /></div>
            <div>{result}</div>
        </div>
    </div>

const Error = ({ result }: { result: string }) =>
    <div className={css.fullscreen} >
        <div className={css.rootContainer}>
            <div><i className="fa fa-microphone" style={{ color: "red" }} /></div>
            <div>ERROR {result}</div>
        </div>
    </div>

const CommandNotFound = ({ result }: { result: string }) =>
    <div className={css.fullscreen} >
        <div className={css.rootContainer}>
            <div><i className="fa fa-microphone" style={{ color: "red" }} /></div>
            <div>{result}</div>
        </div>
    </div>

const CommandFound = ({ result }: { result: string }) =>
    <div className={css.fullscreen} >
        <div className={css.rootContainer}>
            <div><i className="fa fa-microphone" style={{ color: "green" }} /></div>
            <div>{result}</div>
        </div>
    </div>