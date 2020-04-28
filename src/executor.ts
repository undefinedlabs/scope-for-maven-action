import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as tc from '@actions/tool-cache';
import {getVersionToUse} from "./version-parser";

const scopeAgentMetadataURL = "https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-agent/maven-metadata.xml";
const scopeMavenInstrMetadataURL = "https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-instrumentation-for-maven/maven-metadata.xml";
const scopeNoTrackDep = "_scope_notrackdep";

export async function instrument(allowBeta:boolean): Promise<void> {
    const workdir = process.cwd();
    const [agentVersion, instrVersion] = await Promise.all([getVersionToUse(scopeAgentMetadataURL, allowBeta), getVersionToUse(scopeMavenInstrMetadataURL, false)])

    const scopeAgentPath = await tc.downloadTool(`https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-agent/${agentVersion}/scope-agent-${agentVersion}.jar`);
    const finalScopeAgentPath = `${scopeAgentPath.replace('.jar', '')}${scopeNoTrackDep}.jar`
    await io.mv(scopeAgentPath, finalScopeAgentPath);

    const mavenInstrumentatorPath = await tc.downloadTool(`https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-instrumentation-for-maven/${instrVersion}/scope-instrumentation-for-maven-${instrVersion}.jar`);
    const finalMavenInstrumentatorPath = `${mavenInstrumentatorPath.replace('.jar', '')}${scopeNoTrackDep}.jar`
    await io.mv(mavenInstrumentatorPath, finalMavenInstrumentatorPath);

    await exec.exec(`sh -c "find ${workdir} -name \\"pom.xml\\" -exec java -jar ${finalMavenInstrumentatorPath} ${finalScopeAgentPath} {} \\;"`);
}
