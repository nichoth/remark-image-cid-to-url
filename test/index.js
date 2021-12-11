// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const test = require('tape');
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import cidToURL from '../index.js'

test('it lifts a nested list to the root level', t => {
    t.plan(2);

    const markdown = `
# Title

Take a look at this scenery:

![scenery](&Pe5kTo/V/w4MToasp1IuyMrMcCkQwDOdyzbyD5fy4ac=.sha256)
`;

    const actualInput = unified()
        .use(remarkParse, {commonmark: true})
        .parse(markdown);

    t.equal(actualInput.children[2].children[0].url,
        '&Pe5kTo/V/w4MToasp1IuyMrMcCkQwDOdyzbyD5fy4ac=.sha256',
        'should have the expected input URL')

    // can pass in a function to create a URL given an ID
    const actualOutput = cidToURL(blobId => {
        console.log('***id***', blobId)
        return 'http://foo.bar/blob/' + encodeURIComponent(blobId)
    })(actualInput);

    t.equal(actualOutput.children[2].children[0].url,
        'http://foo.bar/blob/%26Pe5kTo%2FV%2Fw4MToasp1IuyMrMcCkQwDOdyzbyD5fy4ac%3D.sha256',
        'shouold have the right output URL')
});
