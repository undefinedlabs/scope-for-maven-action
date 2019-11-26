import * as core from '@actions/core'

async function run() {
    try {
        const nameToGreet = core.getInput('who-to-greet');
        console.log("Hello World" + nameToGreet);
        const time = new Date().toLocaleDateString();
        core.setOutput("time", time)
    } catch (error) {
        core.setFailed(error.message)
    }
}

run();