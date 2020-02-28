import { getVersionToUse } from './version-parser'

test('should return agent version', async () => {
    expect(await getVersionToUse("https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-agent/maven-metadata.xml", false)).not.toBe("");
});

test('should return maven instrumentator version', async () => {
    expect(await getVersionToUse("https://repo1.maven.org/maven2/com/undefinedlabs/scope/scope-instrumentation-for-maven/maven-metadata.xml", false)).not.toBe("");
});