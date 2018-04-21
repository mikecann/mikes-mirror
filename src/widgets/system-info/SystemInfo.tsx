import * as React from 'react';
// import './system-info.css';
import { ipcRenderer } from "electron";
import { SystemInformationStore, State } from './SystemInformationStore';
import { Subscribe } from 'unstated';
import { Systeminformation } from 'systeminformation';

export default class SystemInfo extends React.Component<any, any> {

    render() {
        return <Subscribe to={[SystemInformationStore]}>
            { store => this.renderState(store.state) }
        </Subscribe>
    }

    renderState(state: State) {
        return <div>
            <div>Temp: {state.temp ? this.getTemp(state.temp) : 0}</div>
            <div>Load: {state.load ? this.getLoad(state.load) : 0}</div>
            <div>Mem: {state.mem ? this.getMem(state.mem) : 0}</div>
        </div>
    }

    getTemp = (data: Systeminformation.CpuTemperatureData) => data.main;

    getMem = (data: Systeminformation.MemData) => `${this.toGb(data.used).toFixed(1)} Gb used of ${this.toGb(data.total).toFixed(1)} Gb total`;

    toGb = (bytes: number) => ((bytes/1024) / 1024) / 1024;

    getLoad = (data: Systeminformation.CurrentLoadData) => 
        data.cpus.map(c => c.load.toFixed(2) + "%").join(", ")
}