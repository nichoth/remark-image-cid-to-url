import { createRequire } from "module";
const require = createRequire(import.meta.url);
const ref = require('ssb-ref');
import { visit } from 'unist-util-visit'

const BLOB_REF_LENGTH = `&${Buffer.alloc(32).toString('base64')}.sha256`.length

function cidToUrl (toUrl) {
    return function () {
        return (ast) => {
            visit(ast, 'image', (image) => {
                if (
                    image.url &&
                    typeof image.url === 'string' &&
                    ref.isBlob(image.url.substr(0, BLOB_REF_LENGTH))
                ) {
                    image.url = toUrl(image.url);
                }
                return image;
            });
            return ast;
        };
    }
}

export default cidToUrl
