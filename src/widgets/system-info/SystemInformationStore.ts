import * as si from "systeminformation";
import { Container } from "unstated";

export interface State {
    cpu?: si.Systeminformation.CpuData;
    temp?: si.Systeminformation.CpuTemperatureData;
    mem?: si.Systeminformation.MemData;
    load?: si.Systeminformation.CurrentLoadData;
}

export class SystemInformationStore extends Container<State> {

    private memTimer: NodeJS.Timer;
    private loadTimer: NodeJS.Timer;

    constructor() {
        super();
        this.state = {}
        this.start();
    }

    async start() {
        console.log("Starting performance service..");

        // We only need to grab this information once so do it upfront
        this.setState({ cpu: await si.cpu() });

        // Every so often tick and send new data to the renderer
        this.memTimer = setInterval(async () => this.setState({ mem: await si.mem()  }), 5000);
        this.memTimer = setInterval(async () => this.setState({ load: await si.currentLoad() }), 1000);

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