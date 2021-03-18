import axios, { AxiosResponse } from 'axios';
import * as fs from 'fs';
import { DOMParser as dom } from 'xmldom';
import * as xpath from 'xpath';

const { readFile, writeFile } = fs.promises;

function parse(htmlData: string, xpathQuery: string): Array<xpath.SelectedValue> {
    const doc = new dom({
        locator: {},
        errorHandler: {
            // Ignore warnings and errors since we're parsing HTML, not XML
            warning: () => {},
            error: () => {},
            fatalError: (e) => { console.error(e); }
        }
    }).parseFromString(htmlData);

    return xpath.select(xpathQuery, doc);
}

async function main() {
    const syntaxFile = 'syntaxes/lilypond.tmLanguage.yaml';
    const url = 'https://lilypond.org/doc/v2.22/Documentation/internals/scheme-functions';
    const xpathQuery = '//dl/dt/b/text()';
    const startRegex = /define-markup-list-command\|\\/;
    const startRegexLen = 28;
    const endRegex = /          \)\\/;
    const toReplace = {
        '&lt;': '<',
        '&gt;': '>'
    }
    const toEscape = [
        '?',
        '|'
    ]

    // Fetch the documentation page
    const response: AxiosResponse = await axios.get(url);

    // Get the definitions using an XPath query
    const nodes = parse(response.data, xpathQuery);
    if (nodes.length == 0) {
        console.error(`No definition found in ${url} using XPath query ${xpathQuery})`);
        process.exit(1);
    }

    // Read the syntax file
    const content = await readFile(syntaxFile, 'utf8');

    // Search for the location to insert
    const start = content.search(startRegex);
    if (start < 0) {
        console.error(`No ${startRegex} found in ${syntaxFile}`);
        process.exit(1);
    }
    const end = content.substr(start + startRegexLen + 1).search(endRegex)

    let out = content.substr(0, start + startRegexLen);

    nodes.map(node => node.toString().trim()).forEach((definition, idx, array) => {
        out += "\n            ";

        for (const [sequence, replace] of Object.entries(toReplace)) {
            definition = definition.replace(sequence, replace);
        }
        for (const char of toEscape) {
            definition = definition.replace(char, '\\\\' + char);
        }

        out += definition;

        if (idx !== array.length - 1) {
            out += '|';
        }
        out += '\\';
    })

    out += content.substr(start + startRegexLen + end)

    await writeFile(syntaxFile, out);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
