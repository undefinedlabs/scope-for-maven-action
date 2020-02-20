import * as core from '@actions/core'
import * as executor from './executor'
import * as exec from "@actions/exec";

const SCOPE_AGENT_VERSION = "0.2.5-beta.13";

async function run() {
    try {
        let dsn = core.getInput("dsn", {required: true})
        core.exportVariable("SCOPE_DSN", dsn);

        let executeTestPhase = core.getInput("run-tests", {required: true});
        let command = core.getInput("command", {required: true});

        await executor.instrument(SCOPE_AGENT_VERSION);

        if(executeTestPhase == "true"){
            await exec.exec("sh -c \""+command+"\"");
        }

    } catch (error) {
        core.setFailed(error.message)
    }
}

run();