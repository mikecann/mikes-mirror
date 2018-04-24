import * as React from 'react';
import { exec } from 'child_process';

interface Props {
}

export default class DisplayDeactivator extends React.Component<Props, any> {

    componentDidMount() {
        console.log("Deactivating display..");
        exec("xset -display :0.0 dpms force off", (err, stdout, stderr) => {
            if (err) {
              return console.error(err);
            }
          
            // the *entire* stdout and stderr (buffered)
            console.log(`Deactivating stdout: ${stdout}`);
            console.log(`Deactivating stderr: ${stderr}`);
          });
    }

    componentWillUnmount() {
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

    render() {
        return "";
    }
}