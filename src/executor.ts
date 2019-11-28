import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as tc from '@actions/tool-cache';

export async function instrument(agentVersion:string): Promise<void> {
    const workdir = process.cwd();
    const scopeAgentPath = await tc.downloadTool("https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-agent/"+agentVersion+"/scope-agent-"+agentVersion+".jar");

    if(!scopeAgentPath.endsWith(".jar")) {
        await io.mv(scopeAgentPath, scopeAgentPath+".jar");
    }

    await exec.exec("sh -c \"docker run -v "+workdir+":/home/project -e \\\"SCOPE_AGENT_PATH="+scopeAgentPath+".jar\\\" codescope/scope-instrumentation-for-maven\"");
}