let crypto = self.crypto || self.Crypto;

module.exports = size => crypto.getRandomValues(new Uint8Array(size));
