// const ref = require('ssb-ref');
import { visit } from 'unist-util-visit'
import { filter } from 'unist-util-filter'
import isBlob from './is-blob.js'

const isBlob = function (str) {
    return str[0] === '&'
}

// const BLOB_REF_LENGTH = `&${Buffer.alloc(32).toString('base64')}.sha256`.length

function cidToUrl (toUrl) {
    return function () {
        return (ast) => {
            visit(ast, 'image', (image) => {
                if (
                    image.url &&
                    typeof image.url === 'string' &&
                    isBlob(image.url)
                    // ref.isBlob(image.url.substr(0, BLOB_REF_LENGTH))
                ) {
                    image.url = toUrl(image.url);

                    if (image.url === null) {
                        return null
                    }
                }

                return image;
            });

            var newAst = filter(ast, node => {
                if (node.type === 'image' && node.url === null) return false
                return true
            })

            return newAst
        };
    }
}

export default cidToUrl
