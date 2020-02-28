import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as tc from '@actions/tool-cache';
import {getVersionToUse} from "./version-parser";

const scopeAgentMetadataURL = "https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-agent/maven-metadata.xml";
const scopeMavenInstrMetadataURL = "https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-instrumentation-for-maven/maven-metadata.xml";

export async function instrument(allowBeta:boolean): Promise<void> {
    const workdir = process.cwd();
    const [agentVersion, instrVersion] = await Promise.all([getVersionToUse(scopeAgentMetadataURL, allowBeta), getVersionToUse(scopeMavenInstrMetadataURL, false)])

    const scopeAgentPath = await tc.downloadTool(`https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-agent/${agentVersion}/scope-agent-${agentVersion}.jar`);
    if(!scopeAgentPath.endsWith(".jar")) {
        await io.mv(scopeAgentPath, scopeAgentPath+".jar");
    }

    const mavenInstrumentatorPath = await tc.downloadTool(`https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-instrumentation-for-maven/${instrVersion}/scope-instrumentation-for-maven-${instrVersion}.jar`);
    if(!mavenInstrumentatorPath.endsWith(".jar")){
        await io.mv(mavenInstrumentatorPath, mavenInstrumentatorPath+".jar");
    }

    await exec.exec("sh -c \"find "+workdir+" -name \\\"pom.xml\\\" -exec java -jar "+mavenInstrumentatorPath+".jar \\\""+scopeAgentPath+".jar\\\" {} \\;\"");
}