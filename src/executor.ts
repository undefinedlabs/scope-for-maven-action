import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as tc from '@actions/tool-cache';

export async function instrument(agentVersion:string): Promise<void> {
    const workdir = process.cwd();
    const scopeAgentPath = await tc.downloadTool("https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-agent/"+agentVersion+"/scope-agent-"+agentVersion+".jar");
    if(!scopeAgentPath.endsWith(".jar")) {
        await io.mv(scopeAgentPath, scopeAgentPath+".jar");
    }

    const mavenInstrumentatorPath = await tc.downloadTool("https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-instrumentation-for-maven/0.1.0/scope-instrumentation-for-maven-0.1.0.jar");
    if(!mavenInstrumentatorPath.endsWith(".jar")){
        await io.mv(mavenInstrumentatorPath, mavenInstrumentatorPath+".jar");
    }

    await exec.exec("sh -c \"find "+workdir+" -name \\\"pom.xml\\\" -exec java -jar "+mavenInstrumentatorPath+".jar \\\""+scopeAgentPath+".jar\\\" {} \\;\"");
}