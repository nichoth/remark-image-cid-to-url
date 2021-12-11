const ref = require('ssb-ref');
const visit = require('unist-util-visit');
const toUrl = require('ssb-serve-blobs/id-to-url');

const BLOB_REF_LENGTH = `&${Buffer.alloc(32).toString('base64')}.sha256`.length

function imagesToSsbServeBlobs() {
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

module.exports = imagesToSsbServeBlobs;
