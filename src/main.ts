import { readFile, writeFile } from 'fs/promises';
import { DOMParser as dom } from 'xmldom';
import xpath, { SelectedValue } from 'xpath';

function parse(htmlData: string, xpathQuery: string): Array<SelectedValue> {
    const doc = new dom({
        locator: {},
        errorHandler: {
            // Ignore warnings and errors since we're parsing HTML, not XML
            warning: () => {
                // Do nothing
            },
            error: () => {
                // Do nothing
            },
            fatalError: e => console.error(e)
        }
    }).parseFromString(htmlData);

    return xpath.select(xpathQuery, doc);
}

async function main() {
    const syntaxFile = 'syntaxes/lilypond.tmLanguage.yaml';
    const urls: Record<string, string> = {
        'https://lilypond.org/doc/v2.23/Documentation/internals/scheme-functions': '//dl/dt/b/code/text()',
        'https://lilypond.org/doc/v2.22/Documentation/internals/scheme-functions': '//dl/dt/b/text()'
    };
    const startRegex = 'lilypond-scheme:';
    const endRegex = / {10}\)\\/;
    const toReplace: Array<[RegExp, string]> = [
        [/&lt;/g, '<'],
        [/&gt;/g, '>']
    ];
    const toEscape = ['?', '|'];

    let definitions = new Array<string>();

    for (const [url, xpathQuery] of Object.entries(urls)) {
        // Fetch the documentation page
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`${url} returned an error (${response.status} ${response.statusText})`);
            process.exit(1);
        }

        // Get the definitions using an XPath query
        const nodes = parse(await response.text(), xpathQuery);
        if (nodes.length == 0) {
            console.error(`No definition found in ${url} using XPath query ${JSON.stringify(xpathQuery)})`);
            process.exit(1);
        }

        console.log(`Found ${nodes.length} definitions in ${url}`);

        definitions = [...new Set([...definitions, ...nodes.map(node => node.toString().trim())])];
    }

    // Read the syntax file
    const content = await readFile(syntaxFile, 'utf8');

    // Search for the location to insert
    const start = content.search(startRegex);
    if (start < 0) {
        console.error(`No ${startRegex} found in ${syntaxFile}`);
        process.exit(1);
    }

    const end = content.substring(start + startRegex.length + 1).search(endRegex);

    let out = content.substring(0, start + startRegex.length);

    out += '\n';
    out += '    patterns:\n';
    out += '      - match: "\\\n';
    out += '          \\\\b(\\';

    definitions.forEach((definition, idx, array) => {
        out += '\n            ';

        for (const [sequence, replace] of toReplace) {
            definition = definition.replace(sequence, replace);
        }

        for (const char of toEscape) {
            definition = definition.replace(char, `\\\\${char}`);
        }

        out += definition;

        if (idx !== array.length - 1) {
            out += '|';
        }

        out += '\\';
    });

    out += content.substring(start + startRegex.length + end);

    await writeFile(syntaxFile, out);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
