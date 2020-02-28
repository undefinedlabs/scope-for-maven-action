import fetch from "node-fetch";
import {parseString} from "xml2js";

export async function getVersionToUse(url:string, allowBeta:boolean):Promise<string> {
    const response = await fetch(url);
    const json = await xml2json(await response.text());

    const releaseVersion:string = json.metadata.versioning[0].release[0];
    if(allowBeta || !releaseVersion.includes("beta")){
        return releaseVersion;
    }

    const allVersions:string[] = json.metadata.versioning[0].versions[0].version;
    const lastNonBeta = allVersions.slice().reverse().find(version => !version.includes('beta'))
    if (!lastNonBeta) {
        return ''
    }
    return lastNonBeta;
}

function xml2json(xml:string):Promise<any> {
    return new Promise((resolve, reject) => {
        parseString(xml, function (err, json) {
            if (err)
                reject(err);
            else
                resolve(json);
        });
    });
}
