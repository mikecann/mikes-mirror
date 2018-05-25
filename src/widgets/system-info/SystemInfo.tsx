import * as React from 'react';
import { SystemInformationStore, State } from './SystemInformationStore';
import { Subscribe } from 'unstated';
import { Systeminformation } from 'systeminformation';
import css from "./styles";

export default class SystemInfo extends React.Component<any, any> {

    render() {
        return <Subscribe to={[SystemInformationStore]}>
            { store => this.renderState(store.state) }
        </Subscribe>
    }

    renderState(state: State) {
        return <div className={css.systemInfo}>
            <div><i className="fa fa-microchip" /> {state.mem ? this.getMem(state.mem) : 0}</div>
            <div><i className="fa fa-desktop" /> {state.load ? this.getLoad(state.load) : 0}</div>
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