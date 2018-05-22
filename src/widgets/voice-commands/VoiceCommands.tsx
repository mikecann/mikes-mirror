import * as React from 'react';
// import './face-recognition.css';
import { Subscribe } from "unstated";
import { VoiceCommandsStore } from './VoiceCommandsStore';

interface Props
{

}

export default class VoiceCommands extends React.Component<Props, any> {

    render() {

        return <Subscribe to={[VoiceCommandsStore]}>
        {
            (store: VoiceCommandsStore) => <div className="voice-command">
                voice command
            </div>
        }
        </Subscribe>
    }
}