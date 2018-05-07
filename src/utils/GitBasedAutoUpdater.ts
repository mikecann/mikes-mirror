import { exec } from "child_process";
import * as moment from 'moment';

function execute(command: string) {
    return new Promise<string>((resolve, reject) => {
        exec(command, { cwd: "." }, (error, stdout, stderr) => {
            if (error)
                throw error;
            resolve(stdout);
        });
    });
};

async function checkForUpdate(): Promise<boolean> {
    await execute("git remote update");
    const status = await execute("git status -uno");
    return status.indexOf("Your branch is behind") != -1;
};

export function waitForUpdate(intervalMs: number = 30000) {
    console.log(`Beginning to check for updates every ${intervalMs} ms`);

    return new Promise(resolve => {
        setInterval(async () => {
            
            try {
                const hasUpdate = await checkForUpdate();

                if (!hasUpdate)
                    console.log(`${moment().format("MMMM Do YYYY, h:mm:ss a")} - Currently up to date`);
                else
                {
                    console.log(`${moment().format("MMMM Do YYYY, h:mm:ss a")} - New update detected.`);
                    resolve();
                }
            } catch (error) {
                console.error("An error attempting to update git. ", error)
            }

        }, intervalMs);
    });
}