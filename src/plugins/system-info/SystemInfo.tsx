import * as React from 'react';
import { SystemInformationStore } from './SystemInformationStore';
import { Systeminformation } from 'systeminformation';
import css from "./styles";
import { observer, inject } from 'mobx-react';

interface Props {
    systemInfo?: SystemInformationStore
}

@inject("systemInfo")
@observer
export default class SystemInfo extends React.Component<Props, any> {

    render() {
        const { mem, load } = this.props.systemInfo!;
        return <div className={css.systemInfo}>
            <div><i className="fa fa-microchip" /> {mem ? this.getMem(mem) : 0}</div>
            <div><i className="fa fa-desktop" /> {load ? this.getLoad(load) : 0}</div>
        </div>
    }

 

    getMem = (data: Systeminformation.MemData) => `${this.toGb(data.used).toFixed(1)} Gb used of ${this.toGb(data.total).toFixed(1)} Gb total`;

    toGb = (bytes: number) => ((bytes/1024) / 1024) / 1024;

    getLoad = (data: Systeminformation.CurrentLoadData) => 
        data.cpus.map(c => pad(c.load.toFixed(0), 2) + "%").join(", ")
}

function pad(num: string | number, size: number) {
    var s = String(num);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
  }