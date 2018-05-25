import * as si from "systeminformation";
import { observable } from 'mobx';

export interface State {
    cpu?: si.Systeminformation.CpuData;
    temp?: si.Systeminformation.CpuTemperatureData;
    mem?: si.Systeminformation.MemData;
    load?: si.Systeminformation.CurrentLoadData;
}

export class SystemInformationModel {

    @observable state: State | null = null;

    private memTimer: NodeJS.Timer;
    private loadTimer: NodeJS.Timer;

    async start() {
        console.log("Starting performance service..");

        // We only need to grab this information once so do it upfront
        this.state = { cpu: await si.cpu() };

        // Every so often tick and send new data to the renderer
        this.memTimer = setInterval(async () => this.state = { mem: await si.mem()  }, 5000);
        this.memTimer = setInterval(async () => this.state = { load: await si.currentLoad() }, 1000);

        // For debug purposes lets just dump everything in one object to the console once
        console.log("System Information Dump", {
            dynamic: await si.getDynamicData(),
            static: await si.getStaticData()
        });
    }

    stop() {
        // Stop ticking
        clearInterval(this.memTimer);
        clearInterval(this.loadTimer);
    }
}