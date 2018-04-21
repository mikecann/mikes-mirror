import { exec } from "child_process";
import * as moment from 'moment';

export type GitBasedAutoUpdaterUpdateCheckCallback = (updateAvailabe: boolean) => void;

export class GitBasedAutoUpdater {

    private execute(command: string, callback: (stdout: string) => void) {
        exec(command, { cwd: ".." }, function (error, stdout, stderr) { callback(stdout); });
    };

    private checkForUpdate(callback: (hasUpdate: boolean) => void) {
        this.execute("git remote update", function () {
            this.execute("git status -uno", function (status: string) {
                callback(status.indexOf("Your branch is behind") != -1);
            });
        });
    };

    beginCheckingForUpdates(callback: GitBasedAutoUpdaterUpdateCheckCallback, intervalMs: number = 30000) {
        const interval = 30000;
        console.log(`Beginning to check for updates every ${interval} ms`);

        setInterval(() => {
            this.checkForUpdate(hasUpdate => {
                if (!hasUpdate)
                    console.log(`${moment().format("MMMM Do YYYY, h:mm:ss a")} - Currently up to date`);
                else
                    console.log(`${moment().format("MMMM Do YYYY, h:mm:ss a")} - New update detected.`);

                callback(hasUpdate);
            });

        }, interval)
    }

}