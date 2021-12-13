# remark image CID to URL

Transform a given image ID to a URL by a given function.

## example

```js
// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const test = require('tape');
import remarkParse from 'remark-parse'
import cidToURL from '../index.js'
const remark = require('remark');


test('it transforms a CID by a function', t => {
    t.plan(1);

    const markdown = `
# Title

Take a look at this scenery:

![scenery](&Pe5kTo/V/w4MToasp1IuyMrMcCkQwDOdyzbyD5fy4ac=.sha256)
`;

    const output = remark()
        .use(cidToURL(blobId => {
            return 'http://foo.bar/blob/' + encodeURIComponent(blobId)
        }))
        .use(remarkParse, { commonmark: true })
        .processSync(markdown).contents;
        // this is markdown content

    t.ok(output.includes('foo.bar/blob/'),
        'should include the transformed URL')
});
```
