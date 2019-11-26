import * as core from '@actions/core'
import * as executor from './executor'

async function run() {
    try {
        let apikey = core.getInput("apikey", {required: true})

        await executor.runTestsWithScope(apikey)

    } catch (error) {
        core.setFailed(error.message)
    }
}

run();