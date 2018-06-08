import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { SpeechDetectionStore } from './SpeechDetectionStore';

interface Props {
    speechDetection?: SpeechDetectionStore
}

@inject("speechDetection")
@observer
export default class SpeechDetectionStatusIcon extends React.Component<Props, any> {

    render() {

        const { event, enabled, isRunning } = this.props.speechDetection!;

        if (!isRunning || !enabled)
            return <NotRunningOrEnabled />
    
        if (!event || event.event == "not-ready")
            return <NotReady />
    
        return <Ready />
    }
}

const NotRunningOrEnabled = () =>
    <div>
        <span className="fa fa-microphone" style={{ color: "white", opacity: 0.5, fontSize: "2em" }} />
    </div>

const NotReady = () =>
    <div>
        <span className="fa fa-microphone" style={{ color: "orange", fontSize: "2em" }} />
    </div>

const Ready = () =>
    <div>
        <span className="fa fa-microphone" style={{ fontSize: "2em" }} />
    </div>

// const HotwordDetected = () =>
//     <div className={css.rootContainer}>
//         <span className="fa fa-microphone" style={{ color: "white" }} />
//     </div>

// const Partial = ({ result }: { result: string }) =>
//     <div className={css.rootContainer}>
//         <div><i className="fa fa-microphone" style={{ color: "orange" }} /></div>
//         <div>{result}</div>
//     </div>

// const Final = ({ result }: { result: string }) =>
//     <div className={css.rootContainer}>
//         <div><i className="fa fa-microphone" style={{ color: "white" }} /></div>
//         <div>{result}</div>
//     </div>

// const Error = ({ result }: { result: string }) =>
//     <div className={css.rootContainer}>
//         <div><i className="fa fa-microphone" style={{ color: "red" }} /></div>
//         <div>ERROR {result}</div>
//     </div>

// const CommandNotFound = ({ result }: { result: string }) =>
//     <div className={css.rootContainer}>
//         <div><i className="fa fa-microphone" style={{ color: "red" }} /></div>
//         <div>{result}</div>
//     </div>

// const CommandFound = ({ result }: { result: string }) =>
//     <div className={css.rootContainer}>
//         <div><i className="fa fa-microphone" style={{ color: "green" }} /></div>
//         <div>{result}</div>
//     </div>

// const Unknown = () =>
//     <div className={css.rootContainer}>
//         <div><i className="fa fa-microphone" style={{ color: "green" }} /></div>
//         <div>UNKOWN {JSON.stringify(event)}</div>
//     </div>