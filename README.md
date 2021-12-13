# remark image CID to URL

Transform a given image ID to a URL by a given function.

## install

```
$ npm i -S remark-image-cid-to-url
```

## example

```js
// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const test = require('tape');
import remarkParse from 'remark-parse'
import cidToURL from 'remark-image-cid-to-url'
const remark = require('remark');

const markdown = `
# Title

Take a look at this scenery:

![scenery](&Pe5kTo/V/w4MToasp1IuyMrMcCkQwDOdyzbyD5fy4ac=.sha256)
`;

test('it transforms a CID by a function', t => {
    t.plan(1);

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
