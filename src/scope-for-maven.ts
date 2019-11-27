import * as core from '@actions/core'
import * as executor from './executor'
import * as exec from "@actions/exec";

async function run() {
    try {
        let apikey = core.getInput("apikey", {required: true})

        await executor.instrument();
        exec.exec("cat pom.xml")

    } catch (error) {
        core.setFailed(error.message)
    }
}

run();