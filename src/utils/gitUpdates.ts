import { exec } from "child_process";

function execute(command: string, callback: (stdout: string)=> void){
    exec(command, { cwd: ".." }, function(error, stdout, stderr){ callback(stdout); });
};

export function checkForUpdate(callback: (hasUpdate: boolean) => void) {
    execute("git remote update", function() {
        execute("git status -uno", function(status: string){
            callback(status.indexOf("Your branch is behind") != -1);
        });
    });
};