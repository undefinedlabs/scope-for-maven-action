import * as core from '@actions/core'
import * as exec from '@actions/exec'

async function run() {
    try {
        await exec.exec("ls -l");
        await exec.exec("mvn -v");
    } catch (error) {
        core.setFailed(error.message)
    }
}

run();