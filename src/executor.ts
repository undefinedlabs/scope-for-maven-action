let tempDirectory = process.env['RUNNER_TEMP'] || '';

import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as tc from '@actions/tool-cache';
import * as path from 'path';

const IS_WINDOWS = process.platform === 'win32';

if (!tempDirectory) {
    let baseLocation;
    if (IS_WINDOWS) {
        // On windows use the USERPROFILE env variable
        baseLocation = process.env['USERPROFILE'] || 'C:\\';
    } else {
        if (process.platform === 'darwin') {
            baseLocation = '/Users';
        } else {
            baseLocation = '/home';
        }
    }
    tempDirectory = path.join(baseLocation, 'actions', 'temp');
}

export async function instrument(agentVersion="0.2.2"): Promise<void> {
    const workdir = process.cwd();
    let scopeAgentPath = tc.find("scope-java-agent", agentVersion);

    if(scopeAgentPath){
        core.debug(`Scope Agent found in cache ${scopeAgentPath}`)
    } else{
        let destinationFolder: string = path.join(
            tempDirectory,
            'temp_' + Math.floor(Math.random() * 2000000000)
        );
        await io.mkdirP(destinationFolder);
        await exec.exec("mvn org.apache.maven.plugins:maven-dependency-plugin:3.1.1:copy -Dartifact=com.undefinedlabs.scope:scope-agent:"+agentVersion+":jar -Dtransitive=false -DoutputDirectory="+destinationFolder);

        scopeAgentPath = await tc.cacheFile(path.join(destinationFolder, "scope-agent-"+agentVersion+".jar"), "scope-agent-"+agentVersion+".jar", "scope-java-agent", agentVersion);
    }

    await exec.exec("docker run -v "+workdir+":/home/project -e \"SCOPE_AGENT_PATH="+path.join(scopeAgentPath, "scope-agent-"+agentVersion+".jar")+"\" codescope/scope-instrumentation-for-maven")
}