import { BrowserWindow } from "electron";
import * as si from "systeminformation";


export class PerformanceService {


    constructor(private window: BrowserWindow) {

    }

    start() {
        this.startDetecting();
    }

    private startDetecting() {
        console.log("Starting performance service.... " + this.window);

        si.cpu()
            .then(data => console.log("cpu", data))
            .catch(err => { throw err })
        
        si.cpuTemperature()
            .then(data => console.log("cpuTemperature", data))
            .catch(err => { throw err })
        
        si.mem()
            .then(data => console.log("mem", data))
            .catch(err => { throw err })
        
        si.currentLoad()
            .then(data => console.log("currentLoad", data))
            .catch(err => { throw err })
        
    }

    stop() {
        this.stopDetecting();
    }

    private stopDetecting() {
        
    }
}