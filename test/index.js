// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const test = require('tape');
// import { unified } from 'unified'
import remarkParse from 'remark-parse'
import cidToURL from '../index.js'
const remark = require('remark');

const markdown = `
# Title

Take a look at this scenery:

![scenery](&Pe5kTo/V/w4MToasp1IuyMrMcCkQwDOdyzbyD5fy4ac=.sha256)
`;


test('it transforms a CID by a function', t => {
    t.plan(1);

    // this returns markdown content
    const output = remark()
        .use(cidToURL(blobId => {
            return 'http://foo.bar/blob/' + encodeURIComponent(blobId)
        }))
        .use(remarkParse, { commonmark: true })
        .processSync(markdown).contents;

    console.log('**output**', JSON.stringify(output, null, 2))

    t.ok(output.includes('foo.bar/blob/'),
        'should include the transformed URL')
});
