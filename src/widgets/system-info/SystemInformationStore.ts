import * as si from "systeminformation";
import { Container } from "unstated";

export interface State {
    cpu?: si.Systeminformation.CpuData;
    temp?: si.Systeminformation.CpuTemperatureData;
    mem?: si.Systeminformation.MemData;
    load?: si.Systeminformation.CurrentLoadData;
}

export class SystemInformationStore extends Container<State> {

    private timer: NodeJS.Timer;

    constructor() {
        super();
        this.state = {}
        this.start();
    }

    async start(tickIntervalMs: number = 5000) {
        console.log("Starting performance service..", { tickIntervalMs });

        // We only need to grab this information once so do it upfront
        this.setState({ cpu: await si.cpu() });
       

        // Every so often tick and send new data to the renderer
        this.timer = setInterval(() => this.tick(), tickIntervalMs);

        // Kick us off with an initial tick
        this.tick();

        // For debug purposes lets just dump everything in one object to the console once
        console.log("System Information Dump", {
            dynamic: await si.getDynamicData(),
            static: await si.getStaticData()
        });
    }

    private async tick() {

        //console.time("SystemInformationService.tick()");
        const all = await Promise.all([si.cpuTemperature(), si.mem(), si.currentLoad()]);
        //console.timeEnd("SystemInformationService.tick()");

        this.setState({
            temp: all[0],
            mem: all[1],
            load: all[2]
        })
    }

    stop() {
        // Stop ticking
        clearInterval(this.timer);
    }
}