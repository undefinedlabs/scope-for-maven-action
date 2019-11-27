import * as exec from '@actions/exec';

export async function instrument(): Promise<void> {
    const workdir = process.cwd();
    const scopeFolder = ".scope";

    await exec.exec("mkdir -p "+scopeFolder);
    await exec.exec("rm -f "+scopeFolder+"/scope-agent*.jar");
    await exec.exec("mvn org.apache.maven.plugins:maven-dependency-plugin:3.1.1:copy -Dartifact=com.undefinedlabs.scope:scope-agent:LATEST:jar -Dtransitive=false -DoutputDirectory="+scopeFolder);
    await exec.exec("sh -c \"mv "+scopeFolder+"/scope-agent*.jar "+scopeFolder+"/scope-agent.jar\"");

    const scopeAgentPath = workdir+"/"+scopeFolder+"/scope-agent.jar";
    await exec.exec("docker run -v "+workdir+":/home/project -e \"SCOPE_AGENT_PATH="+scopeAgentPath+"\" codescope/scope-instrumentation-for-maven")
}