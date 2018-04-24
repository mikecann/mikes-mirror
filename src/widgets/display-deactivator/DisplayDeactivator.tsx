import * as React from 'react';
import * as shell from "shelljs";

interface Props {
}

export default class DisplayDeactivator extends React.Component<Props, any> {

    componentDidMount() {
        shell.exec("xset -display :0.0 dpms force off");
    }

    componentWillUnmount() {
        shell.exec("xset -display :0.0 dpms force on");
    }

    render() {
        return "";
    }
}