import { BrowserWindow } from "electron";
import * as si from "systeminformation";

export interface SystemInformationServiceTickData {
    cpu: si.Systeminformation.CpuData;
    temp: si.Systeminformation.CpuTemperatureData;
    mem: si.Systeminformation.MemData;
    load: si.Systeminformation.CurrentLoadData;
}

export const SystemInformationServiceTickChannel = "SystemInformationService-tick";

export class SystemInformationService {

    private cpu: si.Systeminformation.CpuData;
    private timer: NodeJS.Timer;

    constructor(private window: BrowserWindow) {
    }

    async start(tickIntervalMs: number = 5000) {
        console.log("Starting performance service..", { tickIntervalMs });

        // We only need to grab this information once so do it upfront
        this.cpu = await si.cpu();

        // Every so often tick and send new data to the renderer
        this.timer = setInterval(() => this.tick(), tickIntervalMs)
    }

    async tick() {

        //console.time("SystemInformationService.tick()");
        const all = await Promise.all([si.cpuTemperature(), si.mem(), si.currentLoad()]);
        //console.timeEnd("SystemInformationService.tick()");
        
        const payload: SystemInformationServiceTickData = {
            cpu: this.cpu,
            temp: all[0],
            mem: all[1],
            load: all[2]
        };

        this.window.webContents.send(SystemInformationServiceTickChannel, payload);
    }

    stop() {        
        // Stop ticking
        clearInterval(this.timer);
    }
}