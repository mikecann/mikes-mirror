import * as si from "systeminformation";
import { observable, runInAction } from "mobx";

export interface State {
    
}

export class SystemInformationStore {

    @observable cpu?: si.Systeminformation.CpuData;
    @observable temp?: si.Systeminformation.CpuTemperatureData;
    @observable mem?: si.Systeminformation.MemData;
    @observable load?: si.Systeminformation.CurrentLoadData;

    private memTimer: NodeJS.Timer;
    private loadTimer: NodeJS.Timer;

    async start() {
        console.log("Starting performance service..");

        // We only need to grab this information once so do it upfront
        this.updateCpu();

        // Every so often tick and send new data to the renderer
        this.memTimer = setInterval(() => this.updateMem(), 5000);
        this.loadTimer = setInterval(() => this.updateLoad(), 1000);

        // For debug purposes lets just dump everything in one object to the console once
        console.log("System Information Dump", {
            dynamic: await si.getDynamicData(),
            static: await si.getStaticData()
        });
    }

    async updateMem() {
        const mem = await si.mem();
        runInAction(() => this.mem = mem);
    }

    async updateCpu() {
        const cpu = await si.cpu();
        runInAction(() => this.cpu = cpu);
    }

    async updateLoad() {
        const load = await si.currentLoad();
        runInAction(() => this.load = load);
    }

    stop() {
        // Stop ticking
        clearInterval(this.memTimer);
        clearInterval(this.loadTimer);
    }
}