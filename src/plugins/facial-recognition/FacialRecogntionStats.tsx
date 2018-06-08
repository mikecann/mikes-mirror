import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { FacialRecognitionStore } from './FacialRecognitionStore';

interface Props {
    facialStore?: FacialRecognitionStore
}

@inject("facialStore")
@observer
export default class FacialRecogntionStats extends React.Component<Props, any> {

    render() {

        return <span style={{ fontSize: "0.8em" }}>
            <i className="fa fa-video" style={{ marginRight: 5 }} /> 
            {this.props.facialStore!.averageElapsedMs} ms, 
        </span>
    }
}