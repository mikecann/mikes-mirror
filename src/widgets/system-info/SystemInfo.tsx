import * as React from 'react';
// import './system-info.css';
import { ipcRenderer } from "electron";

interface Props {
}

interface State {
}

export default class SystemInfo extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        ipcRenderer.on("SystemInformationService-tick", this.onTick);
    }

    componentWillUnmount() {
        ipcRenderer.removeListener("SystemInformationService-tick", this.onTick);
    }

    onTick = (event: any, message: any) => {
       console.log("got update", message)    
    }

    render() {
        return <div className="system-info">
            hello
        </div>
    }

}