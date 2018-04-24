import * as React from 'react';
import { exec } from 'child_process';

interface Props {
    msBeforeTurnOff: number
}

interface State {
    displayIsOff: boolean;
    displayTurnOffTime: number
}

export default class DisplayDeactivator extends React.Component<Props, State> {

    timeoutId: NodeJS.Timer;
    countdownInterval: NodeJS.Timer;

    constructor(props: Props) {
        super(props);
        this.state = {
            displayIsOff: false,
            displayTurnOffTime: Date.now() + props.msBeforeTurnOff
        }
    }

    componentDidMount() {
        this.countdownInterval = setInterval(() => this.forceUpdate(), 1000);
        this.timeoutId = setTimeout(this.turnOffDisplay, this.props.msBeforeTurnOff);
    }

    turnOffDisplay = () => {
        console.log("Turning off display..");
        exec("xset -display :0.0 dpms force off", (err, stdout, stderr) => {
            if (err) {
                return console.error(err);
            }
    
            this.setState({ displayIsOff: true });
            
            // the *entire* stdout and stderr (buffered)
            console.log(`Deactivating stdout: ${stdout}`);
            console.log(`Deactivating stderr: ${stderr}`);
        });
    }

    componentWillUnmount() {

        clearInterval(this.countdownInterval);
        clearInterval(this.timeoutId);
        
        if (this.state.displayIsOff)
        {
            console.log("Activating display..");
            exec("xset -display :0.0 dpms force on", (err, stdout, stderr) => {
                if (err) {
                  return console.error(err);
                }

                // the *entire* stdout and stderr (buffered)
                console.log(`Activating stdout: ${stdout}`);
                console.log(`Activating stderr: ${stderr}`);
              });
        }
    }

    render() {
        const secs = Math.round((this.state.displayTurnOffTime - Date.now()) / 1000);
        return <div>Turning off the display in {secs} seconds..</div>;
    }
}