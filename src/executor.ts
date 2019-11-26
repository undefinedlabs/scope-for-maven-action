import * as core from '@actions/core';

export async function runTestsWithScope(apikey: string): Promise<void> {
    core.debug("Received Scope APIKey: " + apikey)
}